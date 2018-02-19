const crypto = require('crypto');
const base64url = require('base64url');

const randomString = length => base64url(crypto.randomBytes(length));

class Service {
  setup(app) {
    this.mailer = app.service('mailer');
    this.users = app.service('users');
    this.auth = app.service('authentication');
    this.authConfig = app.get('authentication');
    this.createJWT = app.passport.createJWT;
  }

  create(data) {
    const payload = randomString(20);
    return this.createJWT({ tok: payload }, {
      secret: this.authConfig.secret,
      jwt: this.authConfig.magicLink,
    }).then((token) => {
      const link = `http://localhost:8080/magic?token=${token}`;
      const to = data.email;
      const from = 'ideas@purdueusb.com';
      const subject = 'Your OpenIdeas Magic Link';
      const html = `Welcome to OpenIdeas!\nClick <a href="${link}"> to sign in.`;
      const message = {
        to, from, subject, html,
      };
      return this.mailer.create(message)
        .then(() => {
          Promise.resolve(this.users.patch(
            null,
            { token: payload },
            { query: { email: data.email } },
          ));
        }).catch(err => Promise.reject(err));
    });
  }

  remove(id) {
    return this.verifyJWT(id)
      .then((payload) => {
        Promise.resolve(this.users.patch(null, { token: null }, { query: { token: payload.tok } }));
      }).catch(err => Promise.reject(err));
  }
}

module.exports = options => (new Service(options));

module.exports.Service = Service;