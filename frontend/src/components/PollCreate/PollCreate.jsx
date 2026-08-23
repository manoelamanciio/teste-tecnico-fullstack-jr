import { useState } from 'react'
import styles from './PollCreate.module.css'

function PollCreate({ onCreate }) {
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(['', ''])
    const [creating, setCreating] = useState(false)

    function updateOption(index, value) {
        const updatedOptions = [...options]
        updatedOptions[index] = value
        setOptions(updatedOptions)
    }

    function addOption() {
        setOptions([...options, ''])
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setCreating(true)

        const created = await onCreate({
            question,
            options,
        })

        if (created) {
            setQuestion('')
            setOptions(['', ''])
        }

        setCreating(false)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Criar nova enquete</h2>

            <label>
                Pergunta
                <input
                    onChange={(event) => setQuestion(event.target.value)}
                    required
                    value={question}
                />
            </label>

            {options.map((option, index) => (
                <label key={index}>
                    Opção {index + 1}
                    <input
                        onChange={(event) =>
                            updateOption(index, event.target.value)
                        }
                        required
                        value={option}
                    />
                </label>
            ))}

            <button
                disabled={creating}
                type="button"
                onClick={addOption}
            >
                Adicionar opção
            </button>

            <button disabled={creating} type="submit">
                {creating ? 'Criando...' : 'Criar enquete'}
            </button>
        </form>
    )
}

export default PollCreate