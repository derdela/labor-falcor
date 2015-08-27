'use strict';
const
  falcorExpress = require('falcor-express'),
  Router = require('falcor-router');

const
  express = require('express'),
  app = express();

const
  sessions = require('./sessions.json');

app.use('/model.json', falcorExpress.dataSourceRoute(() => {
  return new Router([{
    route: 'sessionsById[{integers:sessionIds}]["title", "speaker"]',
    get: (pathSet) => {
      const
        sessionKeys = pathSet[2];

      const
        response = {},
        jsonGraphResponse = response['jsonGraph'] = {},
        sessionsById = jsonGraphResponse['sessionsById'] = {};

      pathSet.sessionIds.forEach(function(sessionId) {
        const
          responseSession = sessions[sessionId],
          session = {};

        sessionKeys.forEach(key => session[key] = responseSession[key]);

        sessionsById[sessionId] = session;
      });

      return response;
    }
  }]);
}));

app.use(express.static(__dirname + '/'));

app.listen(3000);
