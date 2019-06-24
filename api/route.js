'use strict';

module.exports = function(app) {

  var controller = require('./controller');

  app.route('/biodata')
    .get(controller.list_all_tasks)
    .post(controller.create_a_task);

  app.route('/biodata/:objectId')
    .get(controller.read_a_task)
    .delete(controller.delete_a_task);
};