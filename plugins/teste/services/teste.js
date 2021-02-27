'use strict';

/**
 * teste.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  apontamentos: async (params) => {
    const apontamento = await strapi.services.apontamento.find()
    return apontamento
  }
};
