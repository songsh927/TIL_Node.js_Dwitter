import * as userRepository from './auth.js';
import { getTweets } from '../database/database.js';


/*
    {
        id:'1',
        text:'트위터 ㅎㅇ',
        createdAt: new Date().toString(),
        userId: '1',
        username: 'ellie',
        password: password,
        name: 'Ellie',
        email: 'ellie@naver.com',
        url: ''
    }
*/
export async function getAll(){
    return getTweets()
    .find()
    .srot({createdAt: -1 })
    .toArray()
    .then(data => {
        console.log(data);
        return data;
    });
}

export async function getAllByUsername(username){
    return getAll().then((tweets) => 
    tweets.filter((tweet) => tweet.username == username)
    );
}

export async function getById(id) {
    const found = tweets.find((tweet) => tweet.id == id);
    if(!found){
        return null;
    }
    const { username, name, url } = await userRepository.findById(found.userId);
    return {...found, username, name, url };
}

export async function create(text, userId){
    
    const userData = await userRepository.findById(userId);
    
    const tweet = {
        text,
        createdAt: new Date(),
        userId,
        name: userData.name,
        username: userData.username,
        url: userData.url,
    };
    console.log(tweet);

    return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet(tweet));

}

export async function update(id, text){
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text;
    }
    return getById(tweet.id);
}

export async function remove(id){
    tweets = tweets.filter((tweet) => tweet.id !==id);
}

function mapOptionalTweet(tweet) {
    return tweet ? {...tweet, id: tweet._id.toString() } : tweet;
}