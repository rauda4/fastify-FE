async function requestUrl(url: string, method: string, data: any = null) {
    async function fetching(url: string, method: string, body: any) {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body,
        })
        return response.json()
    }

    try {

        let body: any = ''

        if (method === "POST") {
            body = JSON.stringify(data)
        }

        if (method === "GET") {
            body = null
        }

        const response = await fetching(url, method, body)
        return response
    } catch (error: any) {
        console.log(error.message);

    }
}

export default requestUrl