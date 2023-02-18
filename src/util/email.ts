// import { SENDGRID_API_KEY } from "../util/secrets";
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(SENDGRID_API_KEY);
// export const sendEmail = (email,subject, text, html = null)=>{
//    return new Promise((resolve, reject)=>{
//     const msg = {
//       to: email,
//       from: 'support@ovpcoin.io', 
//       subject: subject,
//       text: text,
//       html: html,
//     }
//     sgMail
//       .send(msg)
//       .then(() => {
//         resolve({ code: 200 });
//       })
//       .catch((error) => {
//          reject(error);
//       })
//    });
// };