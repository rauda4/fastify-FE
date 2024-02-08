async function requestHelper(url: string, method: string, data: any = null) {
    async function fetching(url: string, method: string, headers:any, body: any = null) {
        const res = await fetch(url, {
            method,
            headers,
            body,
        })
        const result = res.json()
        return result
    }

    try {
        let body: any = ''
        let headers = {
            "Content-Type": "application/json",
        }
        if (method === "POST") {
            body = JSON.stringify(data)
        }

        if (method === "GET") {
            body = null
        }

        const response = await fetching(url, method, headers, body)
        return response

    } catch (error: any) {
        console.log(error.message);

    }
}
export default requestHelper