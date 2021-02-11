const request = require('request');
const { promisify } = require('util');

module.exports = class RequestInterface {
  constructor({ provider }) {
    this.provider = provider;
  }

  async getEndPointContent(param = {}) {
    if (!param.method) {
      param.method = 'get';
    }

    const requestOptions = {
      method: param.method,
      uri: param.uri,
      json: this.providerJsonResponse,
      form: param.form,
      body: param.body,
      headers: param.headers,
      auth: param.auth,
    };

    const pRequest = promisify(request);
    const result = await pRequest(requestOptions);
    return result.body;
  }
};
