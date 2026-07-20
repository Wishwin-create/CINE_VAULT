const API_URL = 'http://localhost:5000/api/auth';

async function handleResponse(res){
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.error || 'Something went wrong');
    } 
    return data;
}

export async function registerUser({username, email, password}) {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    return handleResponse(res);
}

export async function loginUser({email, password}) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
}   