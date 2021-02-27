"use strict";
const Teste = require("../services/teste");
/**
 * teste.js controller
 *
 * @description: A set of functions called "actions" of the `teste` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: "ok",
    });
  },

  apontamentos: async (ctx) => {
    const response = await Teste.apontamentos();
    ctx.send(response);
  },
};
