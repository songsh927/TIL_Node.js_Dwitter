import express from 'express';
import 'express-async-errors';
import * as tweetReposigory from '../data/tweet.js';


const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username
      ? tweetReposigory.getAllByUsername(username)
      : tweetReposigory.getAll();
    res.status(200).json(data);
  });

//GET /tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweetReposigory.getById(id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message : `Tweet id(${id}) is not found`});
    }
});

//POST /tweets
router.post('/', (req, res, next) => {
    const {text, name, username} = req.body;
    const tweet = tweetReposigory.create(text, name, username);
    res.status(201).json(tweet);
});

//PUT /tweets/:id
router.put('/:id' , (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweetReposigory.update(id, text);
    if(tweet){
        tweet.text = text;
        return res.status(200).json(tweet);
    }else{
        return res.status(404).json({message:`Tweet id(${id}) is not found`});
    }
});

//DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweetReposigory.remove(id);
    res.sendStatus(204);
});

export default router;