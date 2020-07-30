import supertest from 'supertest';
import jestOpenAPI from 'jest-openapi';

import app from '../../../src/app';

import { pathToApiSpec } from '../../config';

jestOpenAPI(pathToApiSpec);

const newCheckIn = {
  date: `${new Date()}`,
  mood: 3,
  feelings: ['Happy', 'Optimistic'],
  comment: 'comment1',
};

describe('/api/v1/checkins', () => {
  describe('GET', () => {
    it('returns 200 and no checkIns by default', async () => {
      const res = await supertest(app).get('/api/v1/checkins');
      expect(res.status).toEqual(200);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toEqual([]);
    });
    it('returns 200 and an added checkIn', async () => {
      await supertest(app).post('/api/v1/checkins').send(newCheckIn);

      const res = await supertest(app).get('/api/v1/checkins');
      expect(res.status).toEqual(200);
      expect(res).toSatisfyApiSpec();
      expect(res.body).toEqual([newCheckIn]);
    });
  });
  describe('POST', () => {
    it('returns 201', async () => {
      const res = await supertest(app)
        .post('/api/v1/checkins')
        .send(newCheckIn);
      expect(res.status).toEqual(201);
      expect(res).toSatisfyApiSpec();
    });
  });
});
