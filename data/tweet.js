

let tweets =[
    {
        id:'1',
        text:'트위터 ㅎㅇ',
        createdAt: Date.now().toString(),
        name: 'Ellie',
        username: 'ellie',
        url:''
    },
    {
        id:'2',
        text:'Hello world!',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url:''
    }
];

export async function getAll(){
    return tweets;
}

export async function getAllByUsername(username){
    return tweets.filter((tweet) => tweet.username == username);
}

export async function getById(id) {
    return tweets.find((tweet) => tweet.id === id);
}

export async function create(text, name, username){
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    };
    tweets = [tweet, ...tweets];
    return tweet;
}

export async function update(id, text){
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text;
    }
    return tweet;
}

export async function remove(id){
    tweets = tweets.filter((tweet) => tweet.id !==id);
}