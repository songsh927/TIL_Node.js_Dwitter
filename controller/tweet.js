
export class TweetController{

    constructor(tweetRepository, getSocketIO){
        this.tweet = tweetRepository;
        this.getSocketIO = getSocketIO;
    }

    getTweets = async (req, res) =>{
        const username = req.query.username;
        const data = await(username 
            ? this.tweet.getAllByUsername(username) 
            : this.tweet.getAll());
        res.status(200).json(data);
    };

    getTweet = async (req, res, next) => {
        const id = req.params.id;
        const tweet = await this.tweet.getById(id);
        if(tweet){
            res.status(200).json(tweet);
        }else{
            res.status(404).json({message : `Tweet id(${id}) is not found`});
        }
    };

    createTweet = async (req, res, next) => {
        const {text} = req.body;
        const tweet = await this.tweet.create(text, req.userId);
        res.status(201).json(tweet);
        getSocketIO().emit('tweets',tweet);
    };

    updateTweet = async (req, res, next) => {
        const id = req.params.id;
        const text = req.body.text;
        const tweet = await this.tweet.getById(id);
        if(!tweet){
            return res.sendstatus(404);
        }
        if(tweet.userId !== req.userId){
            return res.sendStatus(403);
        }
    
        const updated = await this.tweet.update(id, text);
        return res.status(200).json(updated);
    };

    deleteTweet = async (req, res, next) => {
        const id = req.params.id;
        const tweet = await this.tweet.getById(id);
        if(!tweet){
            return res.sendStatus(404);
        }
        if(tweet.userId !== req.userId){
            return res.sendStatus(403);
        }
        await this.tweet.remove(id);
        res.sendStatus(204);
    };
}

