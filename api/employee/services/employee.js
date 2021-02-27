'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  endereco: async (params) => {
    const enderecos = await strapi.services.address.find({Numero:123})
    console.log('SERVICE - enderecos', enderecos)
  }
};
