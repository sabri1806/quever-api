const nodemailer = require("nodemailer");

const mailService = () => {
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
        user: "que.ver.movies@gmail.com", // generated ethereal user
        pass: "queverMovies" // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    let HelperOptions = {
      from: '"Que Ver Movies" <info@ag2technology.com',
      to: data.email_to,
      subject: "Alguien recomendó películas para tí...",
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
