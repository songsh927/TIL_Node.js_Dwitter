import faker from 'faker';
import { TweetController } from '../tweet.js';
import httpMocks from 'node-mocks-http';


describe('tweet controller test', () => {
    let tweetController;
    let tweetsRepository;
    let mockedSocket;

    beforeEach(() => {
        tweetsRepository = {};
        mockedSocket = {emit : jest.fn() };
        tweetController = new TweetController(
            tweetsRepository, () => mockedSocket
        );
    });
/*
getTweets
*/
    describe('getTweets',() => {
        it('returns all tweets when username is not provided', async () => {
            const request = httpMocks.createRequest();
            const response = httpMocks.createResponse();
            const allTweets = [
                { text : faker.random.words(3)},
                { text : faker.random.words(3)}
            ];
            tweetsRepository.getAll = () => allTweets;

            await tweetController.getTweets(request, response);

            expect(response.statusCode).toBe(200)
            expect(response._getJSONData()).toEqual(allTweets);
        });

        it('returns tweets for the given user when username is provided', async () => {
            const username = faker.internet.userName();
            const request = httpMocks.createRequest({
                query : {username},
            });
            const response = httpMocks.createResponse();
            const userTweets = [
                { text : faker.random.words(3)},
            ];
            tweetsRepository.getAllByUsername = () => userTweets;

            await tweetController.getTweets(request, response);

            expect(response.statusCode).toBe(200);
        });
    });

/*
getTweet
*/
    describe('getTweet', () => {
        it('return 404 when id is not available', async () => {
            //given
            const userId = faker.random.number(20);
            const request = httpMocks.createRequest({
                params : {userId},
            });
            const response = httpMocks.createResponse();
            const userTweets = false;
            tweetsRepository.getById = () => userTweets;

            //when
            await tweetController.getTweet(request, response);

            //then
            expect(response.statusCode).toBe(404);
            //expect(response._getJSONData().message).toBe("Tweet id("+userId+") is not found");
        });

        it('return 200 when id is available', async () => {
            //given
            const userId = faker.random.number(2);
            const request = httpMocks.createRequest({
                params : {userId},
            });
            const response = httpMocks.createResponse();
            const userTweets = [
                {text : faker.random.words(3)},
            ];
            tweetsRepository.getById = () => userTweets;

            //when
            await tweetController.getTweet(request, response);

            expect(response.statusCode).toBe(200);
        });
    });


/*
createTweet
*/
    describe('createTweet' , () => {
        let newTweet, authorId, request, response;
        beforeEach(() => {
            newTweet = faker.random.words(3);
            authorId = faker.random.number(16);
            request = httpMocks.createRequest({
                body : {text : newTweet},
                userId : authorId,
            });
            response = httpMocks.createResponse();
        });

        it('returns 201 with created tweet object including userId', async () => {
            tweetsRepository.create = jest.fn((text, userId) => ({
                text,
                userId,
            }));

            await tweetController.createTweet(request, response);

            expect(response.statusCode).toBe(201);
            expect(response._getJSONData()).toMatchObject({
                text : newTweet,
                userId : authorId,
            });
            expect(tweetsRepository.create).toHaveBeenCalledWith(newTweet, authorId);
        });

        it('should send an event to a websocket channel', async () => {
            tweetsRepository.create = jest.fn((text, userId) => ({
              text: text,
              userId: userId,
            }));
      
            await tweetController.createTweet(request, response);
      
            expect(mockedSocket.emit).toHaveBeenCalledWith('tweets', {
              text: newTweet,
              userId: authorId,
            });
          });
    });

/*
updateTweet
*/
    describe('updateTweet', () => {

    });
});