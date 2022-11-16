export let user = {}
export let is_login = false;

export const users = [{
        id: 1,
        name: 'Admin',
        username: 'admin',
        password: 'password',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIn0.jVtJk3YGctVUhwQpPz58i_IRPKdfmjWjLQpM9u5zI9Y',
        role: {
            name: 'Admin',
            permissions: [],
            // permissions: ['Dashboard', 'Unit Read', 'Unit Create', 'Unit Update', 'Unit Delete', 'Lab Read', 'Lab Create', 'Lab Update', 'Lab Delete']
        }
    },
    {
        id: 2,
        name: 'User1',
        username: 'user1',
        password: 'password',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJ1c2VybmFtZSI6InVzZXIxIn0.ySCJC9L_g6Clbb2WvcY9VSRv2b3akDz_T50YH--Pwtg',
        role: {
            name: 'Unit Staff',
            permissions: ['Dashboard', 'Unit Read', 'Unit Create', 'Unit Update', 'Unit Delete']
        }
    },
    {
        id: 3,
        name: 'User2',
        username: 'user2',
        password: 'password',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJ1c2VybmFtZSI6InVzZXIyIn0.WbmuDLw3e2qqdKvFtoKfuIUP4USbAxk8lX5E1z3B-4w',
        role: {
            name: 'Lab Staff',
            permissions: ['Dashboard', 'Lab Read', 'Lab Create', 'Lab Update', 'Lab Delete']
        }
    },
];

export function login(username, password) {
    const loggedUser = users.find(user => user.username === username && user.password === password);
    if (loggedUser) {
        user = loggedUser;
        is_login = true;
        return user;
    } else {
        return false;
    }
}

export async function storeToken(token) {
    await localStorage.setItem('user-token', token);
}

export async function getToken() {
    return await localStorage.getItem('user-token');
}

export async function getAuth() {
    console.log('fetching: auth');
    if (await getToken()) {
        is_login = true;
    } else {
        is_login = false;
    }
}

export async function authenticate() {
    console.log('authenticate to server');
    const token = await getToken()
    const loggedUser = await users.find(user => user.token === token);
    if (loggedUser) {
        user = loggedUser;
        is_login = true;
        return user;
    } else {
        return false;
    }
}

export function logout() {
    is_login = false;
    user = {};
    localStorage.removeItem('user-token')
}