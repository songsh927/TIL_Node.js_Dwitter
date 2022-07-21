import * as validator from "express-validator";
import httpMocks from 'node-mocks-http';
import { validate } from "../validator";
import faker from 'faker';

jest.mock('express-validator');

describe('Validator Middleware',() => {
    it('calls next if there are no validation errors' , () => {
        //given
        const request = httpMocks.createRequest();
        const response = httpMocks.createResponse();
        const next = jest.fn();
        validator.validationResult = jest.fn(() => ({isEmpty : () => true}));

        //when
        validate(request, response, next);

        //then
        expect(next).toBeCalled();
    });

    it('returns 400 if there are validation errors' , () => {
        //given
        const request = httpMocks.createRequest();
        const response = httpMocks.createResponse();
        const next = jest.fn();
        validator.validationResult = jest.fn(() => ({
            isEmpty : () => false, 
            array : () => [{msg : 'Error!'}]
        }));

        //when
        validate(request, response, next);

        //then
        expect(next).not.toBeCalled();
        expect(response.statusCode).toBe(400)
    });
});