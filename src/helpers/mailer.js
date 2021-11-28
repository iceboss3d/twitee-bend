import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API);

export const sendMail = async (subject, msg, email) => {
  const message = {
    to: email,
    from: "test@twitee.com",
    subject,
    html: msg,
  };

  await sendgrid.send(message);
};
