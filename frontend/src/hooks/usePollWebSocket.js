
import { useEffect } from 'react'

const websocketUrl =
    import.meta.env.VITE_WEBSOCKET_URL ?? 'ws://localhost:8080'

function usePollWebSocket(onPollUpdate) {
    useEffect(() => {
        const socket = new WebSocket(websocketUrl)

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)

            if (message.type === 'vote.updated') {
                onPollUpdate(message.poll)
            }
        }

        return () => {
            socket.close()
        }
    }, [onPollUpdate])
}

export default usePollWebSocket