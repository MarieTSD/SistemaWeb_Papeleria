const nodemailer = require('nodemailer');
module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
    service:'Gmail',
    secure:true,
    auth:{
       user:'mitienditaofficial@gmail.com',
       pass:'mitiendita1234'
    }
 });
const mailOptions = {
 form:'Mi tiendita Oficial',
 to:'mitienditaofficial@gmail.com',
 subject:'Contacto',
 html: `
 <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
</head>
<body>
   <div style="height: 50px; width: 800px; background-color: darkturquoise"></div>
    <h2 style="text-align: center"> <b>Contacto Usuario </b></h2>
    <p style="text-align: center">Estimado administrador se recibio una peticion de contacto, en seguida se muestran los datos del usuario</p>
    <div style="text-align: center; margin-left: 250px">
    <div class="card text-white bg-primary mb-3" style="max-width: 18rem; text-align: center">
  <div class="card-header"><b> Nombre</b> ${formulario.firstname}</div>
  <div class="card-body">
    <h5 class="card-title"><b> E-Mail:</b>  ${formulario.email}</h5>
    <p class="card-text"><b> Mensaje</b>  ${formulario.message}</p>
  </div>
</div>
</div>
<div style="height: 50px; width: 800px; background-color: darkturquoise; text-align: center"><p>Papeleria "Mi tiendita"</p></div>
</body>
</html>
 `
 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}