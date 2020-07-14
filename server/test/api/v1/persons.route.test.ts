import supertest from 'supertest';
import jestOpenAPI from 'jest-openapi';

import app from '../../../src/app';

import { pathToApiSpec } from '../../config';

jestOpenAPI(pathToApiSpec);

describe('/api/v1/persons', () => {
  describe('GET', () => {
    it('returns 200 and a list of all persons', async () => {
      const res = await supertest(app).get('/api/v1/persons');
      expect(res.status).toEqual(200);
      expect(res).toSatisfyApiSpec();
    });
  });
});
