const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'
const apiToken = import.meta.env.VITE_API_TOKEN

async function request(path, options = {}) {
    const response = await fetch(`${apiUrl}${path}`, {
        ...options,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiToken}`,
            ...options.headers,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message ?? 'Não foi possível completar a requisição.')
    }

    return data
}

export function getLatestPoll() {
    return request('/polls/latest')
}

export function createPoll(payload) {
    return request('/polls', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
}

export function submitVote(pollId, payload) {
    return request(`/polls/${pollId}/votes`, {
        method: 'POST',
        body: JSON.stringify(payload),
    })
}
