"use strict";
const axios = require("axios");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const {google} = require("googleapis");

/**
 * password.js controller
 *
 * @description: A set of functions called "actions" of the `password` plugin.
 */
const generatePassword = () => {
  return "GTA" + crypto.randomBytes(2).toString("hex");
};

const sendEmail = async (user, newPassword) => {
  const senderUser = "eltoncasassio@gmail.com";
  const pass = "xicaradecaffee";

  const CLIENTE_ID = '269212373602-94ocut2mq8qlkck24pme0jt5j6o9u5hf.apps.googleusercontent.com'
  const CLIENT_SECRET = 'JN9zIuitHoS3ncvG6NS8R4qE'
  const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
  const REFRESH_TOKEN = '1//049qCEU2PgYYmCgYIARAAGAQSNwF-L9Ir-j5yOSpJXrg5XjhQ2p_amUkwG5KGFo_71fTDy-H0vMfi9bpxQeltYkCVGEo2p1xaN1A'

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
