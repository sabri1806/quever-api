const nodemailer = require("nodemailer");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const mailService = () => {
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  const emailAddresVar =
    "projects/59179331761/secrets/EMAIL_USER_ADDDRESS/versions/latest";
  const emailPasswordVar =
    "projects/59179331761/secrets/EMAIL_USER_PASSWORD/versions/latest";

  let emailUserAddres;
  let emailUserPass;

  // Imports the Secret Manager library

  // Instantiates a client
  const client = new SecretManagerServiceClient();

  const accessSecretVersion = async () => {
    //Email Address
    const [versionAddress] = await client.accessSecretVersion({
      name: emailAddresVar
    });
    const emailAddressPayload = versionAddress.payload.data.toString("utf8");
    emailUserAddres = emailAddressPayload;
    //Email Password
    const [versionPassword] = await client.accessSecretVersion({
      name: emailPasswordVar
    });
    const emailPasswordPayload = versionPassword.payload.data.toString("utf8");
    emailUserPass = emailPasswordPayload;
  };
  accessSecretVersion();

  return {
    value: "herrero",
    sendMail
  };

  function sendMail(data, movies) {
    const textBody = buildMailBody(data, movies);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        user: emailUserAddres, // generated ethereal user
        pass: emailUserPass // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    let HelperOptions = {
      from: '"Que Ver Movies" <que.ver.movies@gmail.com>',
      to: data.email_to,
      subject: "Someone recommended movies for you!",
      text: textBody
    };

    //Send email
    transporter.sendMail(HelperOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
  }

  function buildMailBody({ firstName, lastName, email }, movies) {
    let textBody = `
      From: ${firstName} ${lastName} <${email}>
      `;

    if (movies && movies.length > 0) {
      movies.forEach(
        movie =>
          (textBody += `
          _ Nombre: ${movie.moviename} Descripción: ${movie.description}`)
      );
    }

    return textBody;
  }
};

module.exports = mailService;
