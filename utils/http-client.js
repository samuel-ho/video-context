
const baseURL = process.env.REACT_APP_API_URL;

let httpHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
const httpClient = () => {
    const client = {};

    client.getAsync = async (relativeUri) => { 
        return fetch(`${baseURL}/${relativeUri}`,{
            headers: {
                ...httpHeaders
            }
        }).then(processResponseAsync);
    }

    client.postAsync = async (relativeUri, payload) => { 
        return fetch(`${baseURL}/${relativeUri}`, {
            method: 'POST',
            headers: {
                ...httpHeaders
            },
            body: JSON.stringify(payload)
        }).then(processResponseAsync);
    }

    const processResponseAsync = async (response) => {
        const json = await response.json();

        if (response.status !== 200) {
            throw new Error(`${response.status}: ${json.data}`);
        }

        return json;
    }

    return client;
}

export default httpClient;