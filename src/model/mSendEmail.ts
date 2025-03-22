// import db from "../db/db";
// import ContactEmail from "../interfaces/contact.interface";

// /**
//  * Use only if the website requires advertising to the suscribers of the
//  * page to generate constant activity in the audience.
//  */
// const SendEmail = {
//   async sendEmail() {
//     try {
//       const querySendEmail = "SELECT email FROM contacts;";
//       const [emails] = await db.execute<ContactEmail[]>(querySendEmail);
//       const publice = emails.map((email) => email.email);
//       const list = publice[0];
//       console.log(list);
//     } catch (err) {
//       console.log(`Error to send Email: ${err}`);
//     }
//   },
// };

// export default SendEmail;
