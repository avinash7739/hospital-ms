// Native fetch is available in Node 18+

const BASE_URL = 'http://127.0.0.1:5000/api';

async function testAuth() {
    console.log('Testing Registration...');
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Test Patient',
            email: `test${Date.now()}@example.com`,
            password: 'password123',
            role: 'patient'
        })
    });
    const regData = await regRes.json();
    console.log('Register Response:', regData);

    if (!regData.token) {
        console.error('Registration failed');
        return null;
    }

    console.log('Testing Login...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: regData.email,
            password: 'password123'
        })
    });
    const loginData = await loginRes.json();
    console.log('Login Response:', loginData);

    return loginData.token;
}

async function run() {
    try {
        const token = await testAuth();
        if (token) {
            console.log('Authentication Verified!');
        }
    } catch (err) {
        console.error('Test Failed:', err);
    }
}

run();
