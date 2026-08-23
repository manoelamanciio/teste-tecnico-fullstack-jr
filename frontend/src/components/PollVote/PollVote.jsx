import { useState } from 'react'
import styles from './PollVote.module.css'

function PollVote({ poll, disabled, onVote }) {
    const [selectedOption, setSelectedOption] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        if (selectedOption) {
            onVote(Number(selectedOption))
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <fieldset disabled={disabled}>
                <legend>Escolha uma opção</legend>

                <div className={styles.options}>
                    {poll.options.map((option) => (
                        <label className={styles.option} key={option.id}>
                            <input
                                type="radio"
                                name="poll-option"
                                value={option.id}
                                checked={Number(selectedOption) === option.id}
                                onChange={(event) => setSelectedOption(event.target.value)}
                            />
                            <span>{option.text}</span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <button disabled={!selectedOption || disabled} type="submit">
                Votar
            </button>
        </form>
    )
}

export default PollVote