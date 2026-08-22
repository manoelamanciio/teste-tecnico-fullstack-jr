import styles from './App.module.css'

function App() {
    return (
        <main className={styles.page}>
            <section className={styles.card}>
                <span className={styles.label}>Enquetes ao vivo</span>
                <h1>Mural de Enquetes</h1>
                <p>Crie uma enquete, vote e acompanhe os resultados em tempo real.</p>
            </section>
        </main>
    )
}

export default App
