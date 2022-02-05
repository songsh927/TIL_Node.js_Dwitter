// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
let users = [
    {
        'id': '1',
        "username": "bob",
        "password": "$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm",
        "name": "Bob",
        "email": "bob@dc.com",
        "url": "",
    }
]

export async function findByUsername(username){
    return users.find((user) => user.username == username);
}

export async function createUser(user){
    const created = {...user, id: Date.now().toString()};
    users.push(created);
    return created.id;
}