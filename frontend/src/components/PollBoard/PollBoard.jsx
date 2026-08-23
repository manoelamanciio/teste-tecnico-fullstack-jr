import { useEffect, useState } from 'react'
import { getLatestPoll } from '../../services/api'
import PollResults from '../PollResults/PollResults'

function PollBoard() {
    const [poll, setPoll] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPoll() {
            try {
                const data = await getLatestPoll()
                setPoll(data)
            } catch (requestError) {
                setError(requestError.message)
            } finally {
                setLoading(false)
            }
        }

        loadPoll()
    }, [])

    if (loading) {
        return <p>Carregando enquete...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return <PollResults poll={poll} />
}

export default PollBoard