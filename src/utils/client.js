const apiUrl = `http://localhost:4000`

const request = async (path, opts = {}) => {
    const res = await fetch(`${apiUrl}${path}`, opts)
    return await res.json()
}

const client = {
    get: async path => await request(path),
    post: async (path, opts) => await request(path, opts),
    delete: async (path, opts) => await request(path, opts),
    put: async (path, opts) => await request(path, opts)
}

export default client