const uuid = require('uuid/v1');
const express = require('express');
const app = express();
const port = 3000;

const users = function () {
  const availableUsers = [
    {
      user: 'user',
      password: 'user',
      roles: ['USER']
    },
    {
      user: 'admin',
      password: 'admin',
      roles: ['USER', 'ADMIN']
    }
  ];

  return {
    authenticate(credentials) {
      return availableUsers.find(
        user => credentials && user.user === credentials.user && user.password === credentials.password);
    }
  };
}();

const userSessions = function () {
  const sessionExpirationTimeInMillis = 5 * 60 * 1000; // 5 minutes
  const sessions = {};

  return {
    add(user) {
      const token = uuid();
      const userCopy = {...user};
      delete userCopy.password;
      sessions[token] = {
        user: userCopy,
        timestamp: Date.now()
      };
      return token;
    },
    updateTimestamp(token) {
      if (token && sessions[token]) {
        sessions[token].timestamp = Date.now();
      }
    },
    removeSession(token) {
      if (token && sessions[token]) {
        delete sessions[token];
      }
    },
    get(token) {
      return token && sessions[token] && sessions[token].user;
    },
    sessionIsInvalid(token) {
      const currentTimestampInMillis = Date.now();
      const sessionTimestampInMillis = token && sessions[token] && sessions[token].timestamp;
      const valid = sessionTimestampInMillis
        && currentTimestampInMillis - sessionTimestampInMillis < sessionExpirationTimeInMillis;
      return !valid;
    }
  };
}();

app.use(express.json());

makeServiceCallsSecurityAware(app, ['/api/login', '/api/logout']);

app.post('/api/login', (req, res) => {
  const credentials = req.body;
  const user = users.authenticate(credentials);
  if (user) {
    const token = userSessions.add(user);
    res.json({token});
  } else {
    res.sendStatus(403);
  }
});

app.post('/api/logout', (req, res) => {
  const token = req.headers.authorization;
  userSessions.removeSession(token);
  res.sendStatus(200);
});

app.get('/api/current-user', (req, res) => {
  const token = req.headers.authorization;
  const user = userSessions.get(token);
  user ? res.json(user) : res.sendStatus(500);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function makeServiceCallsSecurityAware(app, ignoredUrls) {
  app.use((req, res, next) => {
    if (ignoreUrl(req.url)) {
      next();
    } else {
      const token = req.headers.authorization;
      if (userSessions.sessionIsInvalid(token)) {
        res.sendStatus(403);
      } else {
        userSessions.updateTimestamp(token);
        next();
      }
    }
  });

  function ignoreUrl(url) {
    return ignoredUrls
      .map(ignoredUrl => url && url.indexOf(ignoredUrl) !== -1)
      .reduce((ignore, currentIgnore) => ignore || currentIgnore);
  }
}
