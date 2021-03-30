'use strict';
const axios = require('axios')
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
    ctx.send(ctx);
  },

  reset: async (ctx) => {
    const {user} = ctx.request.body
    // let teste = await strapi.query('user', 'users-permissions').find({username: 'maycon'});
    
    
    const values = { 
      password: 'Strapi#3'
    }
    
    const params = 3

    
      try {
        let teste = await strapi.plugins['users-permissions'].services.user.edit(
          params,
          values
        );
      } catch (error) {
        
      }
    
    ctx.send({msg:'ok'});
  },
};
