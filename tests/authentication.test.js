import { jest, describe, test, expect } from '@jest/globals';
import authentication from '../src/middlewares/authentication.middleware.js';

describe('Authentication middleware', () => {

    test('should reject requests without Authorization header', async () => {
        const req = {
            path: '/account/user/testuser',
            headers: {}
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const next = jest.fn();

        await authentication(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test('should reject invalid Authorization header format', async () => {
        const req = {
            path: '/account/user/testuser',
            headers: {
                authorization: 'Bearer invalid-token'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const next = jest.fn();

        await authentication(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test('should allow registration without Authorization header', async () => {
        const req = {
            path: '/account/register',
            headers: {},
            method: 'POST',
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const next = jest.fn();

        await authentication(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
    });

    test('should allow public access to posts', async () => {
        const req = {
            path: '/forum/posts',
            headers: {},
            method: 'GET'
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const next = jest.fn();

        await authentication(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
    });

    test('should reject POST requests to public posts without authentication', async () => {
        const req = {
            method: 'POST',
            path: '/forum/posts',
            headers: {}
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const next = jest.fn();

        await authentication(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });
});