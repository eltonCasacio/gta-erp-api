'use strict';
const axios = require('axios');
const crypto = require("crypto");
const nodemailer = require('nodemailer');
/**
 * password.js controller
 *
 * @description: A set of functions called "actions" of the `password` plugin.
 */
 const generatePassword = () => {
   return 'GTA'+crypto.randomBytes(2).toString('hex');
 }

 const sendEmail = async (user, newPassword) => {
  const senderUser = "eltoncasassio@gmail.com"
  const pass = "xicaradecaffee"

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: senderUser,
      pass
    }
  })

  transporter.sendMail({
    from: senderUser,
    to: user.email,
    replyTo: user.email,
    subject: 'Reset de senha GTA Serviços',
    text: `Senha nova: ${newPassword}` 
  })
  .then(info => console.log("RETORNO DE SENDMAIL ", info))
  .catch(error => console.error(error))
 
 }

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
    const {username} = ctx.request.body
    const userFound = await strapi.query('user', 'users-permissions').find({username: username});
    
    if(userFound.length <= 0){
      ctx.send({msg:'Usuário inválido!'})
      return null
    }

    const user = userFound[0]
    const password = generatePassword()  
    const values = { password }
    const params = user.id
    
    try {
        await strapi.plugins['users-permissions'].services.user.edit(
            params,
            values
          );
        
        sendEmail(user, password)

      } catch (error) {
        ctx.send({msg:'Houve um erro ao gerara nova senha',error});
      }
    
    ctx.send({msg:'Uma nova senha foi gerada e enviada para seu e-mail'});
  },
};
