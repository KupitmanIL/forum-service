import { jest, describe, test, expect } from '@jest/globals';
import validate from '../src/middlewares/validator.middleware.js';

describe('Registration validation', () => {
    test('should reject registration with an empty password', () => {
        const req = {
            body: {
                login: 'testuser',
                password: '',
                firstName: 'Test',
                lastName: 'User'
            },
            path: '/account/register'
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        const next = jest.fn();

        validate('register')(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(next).not.toHaveBeenCalled();
    });
});

test('should reject a password shorter than 8 characters', () => {
    const req = {
        body: {
            login: 'testuser',
            password: '1234567',
            firstName: 'Test',
            lastName: 'User'
        }
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    };

    const next = jest.fn();

    validate('register')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
});

test('should accept valid registration data', () => {
    const req = {
        body: {
            login: 'testuser',
            password: 'securePassword123',
            firstName: 'Test',
            lastName: 'User'
        }
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    };

    const next = jest.fn();

    validate('register')(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
});

test('should reject registration with ADMIN role', () => {
    const req = {
        body: {
            login: 'testuser',
            password: 'securePassword123',
            firstName: 'Test',
            lastName: 'User',
            roles: ['ADMIN']
        }
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    };

    const next = jest.fn();

    validate('register')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
});