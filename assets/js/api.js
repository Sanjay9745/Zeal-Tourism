const APIQuery = {
    baseUrl: 'http://localhost:3002/api',
    cdnUrl: 'http://localhost:3002/',
    get: async (url) => {
        const response = await fetch(url);
        return response.json();
    },
    post: async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    postForm: async (url, data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        return response.json();
    },
    putForm: async (url, data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        const response = await fetch(url, {
            method: 'PUT',
            body: formData,
        });
        return response.json();
    },
    put: async (url, data) => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    delete: async (url) => {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        return response.json();
    },
}