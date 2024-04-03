const request = require('supertest');
const app = require('../src/index');

describe('Testing get tasks endpoint /tasks', () => {
    it('Should Have a status code of 200 and a response property message', async () => {
        const response = await request(app).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data')
    });
});

describe('Testing create tasks endpoint /tasks/:id', () => {
    it('Should Have a status code of 201 and a response property message', async () => {
        const response = await request(app).post('/tasks')
            .send({
                title: 'test title',
                description: 'test description'
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
    });
});

describe('Testing the functionality of create tasks endpoint /tasks/:id in another way', () => {
    it('Should Have a status code of 200 and a response property message', async () => {
        const response = await request(app).post('/tasks')
            .send({
                title: 'test title',
                description: 'test description'
            });
        const response2 = await request(app).get('/tasks');
        expect(response2.status).toBe(200);
        expect(response2.body.data.length).toBeGreaterThan(0);
    });
});