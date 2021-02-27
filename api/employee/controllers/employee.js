'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  endereco: async (ctx) => {
    console.log('CONTROLLER - enderecos')

    await strapi.services.employee.endereco();

    ctx.send("FIM CONTROLLER")
  }
};
