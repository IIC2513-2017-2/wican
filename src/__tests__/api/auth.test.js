const supertest = require('supertest');
const app = require('../../api-app');

const request = supertest.agent(app.listen());

describe('Auth API', () => {
  context('when no login data is given', () => {
    it('returns unauthorized', () => {
      return request
        .post('/api/auth')
        .expect(401);
    });
  });
});
