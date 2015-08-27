/* globals falcor */
'use strict';

var model = new falcor.Model({
  source: new falcor.HttpDataSource('/model.json')
});

model
  .get('sessionsById[1,2]["title"]')
  .then(function(response) {
    document.write(response.json);
  });
