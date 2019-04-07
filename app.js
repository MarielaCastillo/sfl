var express = require('express')
var app = express()
var path = require('path')
app.use(express.static("public"))
app.set('view engine', 'ejs')
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const port = process.env.PORT || 80
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World ')
})

app.get('/hola', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
})

app.get('/home', function (req, res) {
  res.render('home.ejs')
})
app.get('/nosotros', function (req, res) {
  const navbar="finalnavbar.ejs";
  res.render('nosotros.ejs',{navbar})
})
app.get('/productos', function (req, res) {
  const navbar="finalnavbar.ejs";
  res.render('productos.ejs',{navbar})
})

app.get('/proyectos', function (req, res) {
  const principal="./projects/projects.ejs";
  //relativas a ubicacion de principal
  const header="../oscarheader.ejs";
  const navbar="../finalnavbar.ejs";
  const footer="../oscarfooter.ejs"
  const scriptFile="./projectScripts.ejs";
  const cssFile="./projectsStyles.ejs"
  const card="./project.ejs"
  res.render(principal,{
      header,
      navbar,
      footer,
      scriptFile,
      cssFile,
      card,
      page:"proyectos"
  })
  // res.render('projects.ejs')

})
app.get('/proyectos/:id', function (req, res) {
  console.log(`soy el proyecto: ${req.params.id}`)
  const principal="./projectSpecific/project.ejs";
  //relativas a ubicacion de principal
  const header="../oscarheader.ejs";
  const navbar="../finalnavbar.ejs";
  const footer="../oscarfooter.ejs"
  const scriptFile="./projectScripts.ejs";
  const cssFile="./projectStyles.ejs"
  const card="./project.ejs"
  res.render(principal,{
      header,
      navbar,
      footer,
      scriptFile,
      cssFile,
      card,
      page:"proyectos"
  })
  // res.render('projects.ejs')

})




app.post('/send', (req, res) => {
  console.log(req.body.Nombre);
  mailfun(req.body);
  res.send('Hello World');
});


function mailfun(body) {
  var nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  })

var contenidocorreo = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<h1> ¡Has recibido un correo! </h1>
<p>Nombre: ${body.Nombre}</p>
<p>Correo: ${body.Correo}</p>
<p>Mensaje: ${body.Mensaje}</p>
<button>Push le button</button>
</body>
</html>
`
var mailOptions = {
      from: process.env.user,
      to: process.env.user2,
      subject: 'Sending Email using Node.js',
      html: contenidocorreo
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

app.listen(port)