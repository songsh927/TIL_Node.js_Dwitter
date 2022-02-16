import * as userRepository from './auth.js';
import { getTweets } from '../database/database.js';
import MongoDb from 'mongodb';
//const ObjectId = MongoDb.ObjectId;


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
    .sort({createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getAllByUsername(username){
    return getTweets()
    .find({username})
    .sort({createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
    return getTweets()
    .findOne({_id: new MongoDb.ObjectId(id)})
    .then(mapOptionalTweet);

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
    .then((data) => mapOptionalTweet({...tweet, _id:data.insertedId})
    );

}

export async function update(id, text){
    return getTweets()
    .findOneAndUpdate(
        {_id: new MongoDb.ObjectId(id)},
        {$set: {text}},
        {returnDocument: 'after'}
    )
    .then(result => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id){
    return getTweets()
    .deleteOne({_id: new MongoDb.ObjectId(id) });
}

function mapOptionalTweet(tweet) {
    return tweet ? {...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet);
}