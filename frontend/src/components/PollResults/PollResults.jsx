import styles from './PollResults.module.css'

function PollResults({ poll }) {
    const totalVotes = poll.options.reduce(
        (total, option) => total + option.votes_count,
        0,
    )

    return (
        <section>
            <h2>{poll.question}</h2>

            <div className={styles.options}>
                {poll.options.map((option) => {
                    const percentage = totalVotes > 0
                        ? Math.round((option.votes_count / totalVotes) * 100)
                        : 0

                    return (
                        <div className={styles.option} key={option.id}>
                            <div className={styles.details}>
                                <span>{option.text}</span>
                                <span>{option.votes_count} voto(s) · {percentage}%</span>
                            </div>

                            <div className={styles.track}>
                                <div
                                    className={styles.bar}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <p className={styles.total}>Total de votos: {totalVotes}</p>
        </section>
    )
}

export default PollResults