const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  })

  describe('GET /launches', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
  
  describe('POST /launch', () => {
    const completeLaunchData = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
      launchDate: 'Janury 4, 2028'
    };
  
    const launchDataWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
    };
  
    const launchDataWithInvalidDate = {
       mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
      launchDate: 'zoot'
    }
  
    test('It should respond with 201 created', async () => {
      const response = await request(app)
      .post('/v1/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201);
  
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);
  
      expect(response.body).toMatchObject(launchDataWithoutDate)
    });
  
    test('It should catch missing required properties', async () => {
      const response = await request(app)
      .post('/v1/launches')
      .send(launchDataWithoutDate)
      .expect(400);
  
      expect(response.body).toStrictEqual({
        error: 'Missing required launch property',
      })
    });
  
    test('It should catch invalid dates', async () => {
       const response = await request(app)
      .post('/v1/launches')
      .send(launchDataWithInvalidDate)
      .expect(400);
  
      expect(response.body).toStrictEqual({
        error: 'Invalid launch date',
      });
    });
  });

});

/** ALTERNATIVELY - USING NODE'S TEST RUNNER **/
// const { describe, test } = require('node:test');
// const { deepStrictEqual } = require('node:assert');
// const request = require('supertest');
// const app = require('../../app');

// describe('GET /launches', () => {
//   test('It should respond with 200 success', async () => {
//     const response = await request(app)
//       .get('/launches')
//       .expect('Content-Type', /json/)
//       .expect(200);
//   });
// });

// describe('POST /launch', () => {
//   const completeLaunchData = {
//     mission: 'USS Enterprise',
//     rocket: 'NCC 1701-D',
//     target: 'Kepler-186 f',
//     launchDate: 'Janury 4, 2028'
//   };

//   const launchDataWithoutDate = {
//     mission: 'USS Enterprise',
//     rocket: 'NCC 1701-D',
//     target: 'Kepler-186 f',
//   };

//   const launchDataWithInvalidDate = {
//      mission: 'USS Enterprise',
//     rocket: 'NCC 1701-D',
//     target: 'Kepler-186 f',
//     launchDate: 'zoot'
//   }

//   test('It should respond with 201 created', async () => {
//     const response = await request(app)
//     .post('/launches')
//     .send(completeLaunchData)
//     .expect('Content-Type', /json/)
//     .expect(201);

//     const requestDate = new Date(completeLaunchData.launchDate).valueOf();
//     const responseDate = new Date(response.body.launchDate).valueOf();
//     // expect(responseDate).toBe(requestDate);
//     deepStrictEqual(responseDate, requestDate);

//     const { mission, rocket, target } = response.body;
//     deepStrictEqual({ mission, rocket, target }, launchDataWithoutDate)
//     // expect(response.body).toMatchObject(launchDataWithoutDate);
//   });

//   test('It should catch missing required properties', async () => {
//     const response = await request(app)
//     .post('/launches')
//     .send(launchDataWithoutDate)
//     .expect(400);

//     // expect(response.body).toStrictEqual({
//     //   error: 'Missing required launch property',
//     // });
//     deepStrictEqual(response.body, {
//       error: 'Missing required launch property',
//     });
//   });

//   test('It should catch invalid dates', async () => {
//      const response = await request(app)
//     .post('/launches')
//     .send(launchDataWithInvalidDate)
//     .expect(400);

//     // expect(response.body).toStrictEqual({
//     //   error: 'Invalid launch date',
//     // });
//     deepStrictEqual(response.body, {
//       error: 'Invalid launch date',
//     });
//   });
// });


