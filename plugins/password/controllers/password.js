'use strict';

/**
 * password.js controller
 *
 * @description: A set of functions called "actions" of the `password` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */
// 
  index: async (ctx) => {
    ctx.send({
      message: 'ok'
    });
  },

  reset: async (ctx) => {
    console.log('BODY???', ctx.body)
    ctx.send({
      message: 'ok'
    });
  },
};
