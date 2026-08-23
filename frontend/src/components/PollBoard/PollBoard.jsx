import { useCallback, useEffect, useState } from 'react'
import {
    createPoll,
    getLatestPoll,
    submitVote,
} from '../../services/api'
import usePollWebSocket from '../../hooks/usePollWebSocket'
import PollCreate from '../PollCreate/PollCreate'
import PollResults from '../PollResults/PollResults'
import PollVote from '../PollVote/PollVote'

function getVoterToken() {
    let token = localStorage.getItem('voter-token')

    if (!token) {
        token = crypto.randomUUID()
        localStorage.setItem('voter-token', token)
    }

    return token
}

function PollBoard() {
    const [poll, setPoll] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)

    const handlePollUpdate = useCallback((updatedPoll) => {
        setPoll(updatedPoll)
    }, [])

    usePollWebSocket(handlePollUpdate)

    useEffect(() => {
        async function loadPoll() {
            try {
                const data = await getLatestPoll()

                setPoll(data)
                setHasVoted(
                    localStorage.getItem(`voted-poll-${data.id}`) === 'true',
                )
            } catch (requestError) {
                setError(requestError.message)
            } finally {
                setLoading(false)
            }
        }

        loadPoll()
    }, [])

    async function handleCreate(payload) {
        setError('')

        try {
            const data = await createPoll(payload)

            setPoll(data)
            setHasVoted(false)

            return true
        } catch (requestError) {
            setError(requestError.message)

            return false
        }
    }

    async function handleVote(optionId) {
        setError('')
        setSubmitting(true)

        try {
            const data = await submitVote(poll.id, {
                option_id: optionId,
                voter_token: getVoterToken(),
            })

            setPoll(data)
            setHasVoted(true)
            localStorage.setItem(`voted-poll-${poll.id}`, 'true')
        } catch (requestError) {
            setError(requestError.message)
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return <p>Carregando enquete...</p>
    }

    if (!poll) {
        return <p>{error}</p>
    }

    return (
        <>
            <PollCreate onCreate={handleCreate} />

            {error && <p>{error}</p>}

            <PollVote
                disabled={submitting || hasVoted}
                onVote={handleVote}
                poll={poll}
            />

            {hasVoted && <p>Seu voto já foi registrado.</p>}

            <PollResults poll={poll} />
        </>
    )
}

export default PollBoard