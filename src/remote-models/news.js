const request = require('superagent');
const _ = require('lodash');

module.exports = {
  async getLatestOn(keywords) {
    const response = await request.get(`${process.env.THE_GUARDIAN_API_HOST}/search`)
      .query({ q: keywords, 'api-key': process.env.THE_GUARDIAN_API_KEY });
    return _.get(response, 'body.response.results', []);
  },
};
