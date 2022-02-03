import * as tweetReposigory from '../data/tweet.js';

export async function getTweets(req, res){
    const username = req.query.username;
    const data = await (username
      ? tweetReposigory.getAllByUsername(username)
      : tweetReposigory.getAll());
    res.status(200).json(data);
};

export async function getTweet(req, res){
    const id = req.params.id;
    const tweet = tweetReposigory.getById(id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message : `Tweet id(${id}) is not found`});
    }
};

export async function createTweet(req, res){
    const {text, name, username} = req.body;
    const tweet = await tweetReposigory.create(text, name, username);
    res.status(201).json(tweet);
};

export async function updateTweet(req, res){
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetReposigory.update(id, text);
    if(tweet){
        tweet.text = text;
        return res.status(200).json(tweet);
    }else{
        return res.status(404).json({message:`Tweet id(${id}) is not found`});
    }
};

export async function deleteTweet(req, res){
    const id = req.params.id;
    await tweetReposigory.remove(id);
    res.sendStatus(204);
};