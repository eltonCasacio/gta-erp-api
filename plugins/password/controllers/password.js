"use strict";
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const envConfig = require('../envConfig.js')
/**
 * password.js controller
 *
 * @description: A set of functions called "actions" of the `password` plugin.
 */
const generatePassword = () => {
  return "GTA" + crypto.randomBytes(2).toString("hex");
};

const sendEmail = async (user, newPassword) => {

  console.log()
  const senderUser = envConfig.SENDERUSER;
  const pass = envConfig.PASS;

  const CLIENTE_ID = envConfig.CLIENTE_ID
  const CLIENT_SECRET = envConfig.CLIENT_SECRET
  const REDIRECT_URI = envConfig.REDIRECT_URI
  const REFRESH_TOKEN = envConfig.REFRESH_TOKEN

  const oAuth2Client = new google.auth.OAuth2(CLIENTE_ID, CLIENT_SECRET, REDIRECT_URI)
  oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: 'OAuth2',
        user: senderUser,
        clientId: CLIENTE_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    const mailOptions = {
      from: senderUser,
      to: user.email,
      replyTo: user.email,
      subject: "Reset de senha GTA Serviços",
      text: `Senha nova: ${newPassword}`,
    }

    const result = await transporter.sendMail(mailOptions)
    return result
  } catch (error) {
    return error
  }
};

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
    const { username } = ctx.request.body;
    const userFound = await strapi
      .query("user", "users-permissions")
      .find({ username: username });

    if (userFound.length <= 0) {
      ctx.send({ msg: "Usuário inválido!" });
      return null;
    }

    const user = userFound[0];
    const password = generatePassword();
    const values = { password };
    const params = user.id;

    try {
      await strapi.plugins["users-permissions"].services.user.edit(
        params,
        values
      );

      sendEmail(user, password);
    } catch (error) {
      ctx.send({ msg: "Houve um erro ao gerara nova senha", error });
    }

    ctx.send({ msg: "Uma nova senha foi gerada e enviada para seu e-mail" });
  },
};
