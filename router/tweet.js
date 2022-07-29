import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

//Contract Testing: Client-Server



const router = express.Router();

const validateTweet = [
    body('text')
        .trim()
        .isLength({min: 3})
        .withMessage('Text should be at least 3 charaters'),
    validate
]

export default function tweetRouter(tweetController){
    
    // GET /tweets
    // GET /tweets?username=:username
    router.get('/', isAuth , tweetController.getTweets);
    
    //GET /tweets/:id
    router.get('/:id', isAuth , tweetController.getTweet);
    
    //POST /tweets
    router.post('/', isAuth , validateTweet, tweetController.createTweet);
    
    //PUT /tweets/:id
    router.put('/:id' , isAuth , validateTweet, tweetController.updateTweet);
    
    //DELETE /tweets/:id
    router.delete('/:id', isAuth , tweetController.deleteTweet);
    return router;
}