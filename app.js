var express = require('express')
var app = express()
var path = require('path')
app.use(express.static("public"))
app.set('view engine', 'ejs')
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const port = process.env.PORT || 80

const {sendEmail} =require("./helpers/Email/sendEmail")
const {htmlContent} =require("./helpers/Email/templateMagico")
const {htmlContent2} =require("./helpers/Email/clienteMagico")
const {resetHtmlContent} =require("./helpers/Email/resetTemplate")

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

app.get('/waves', function (req, res) {
  res.render('waves.ejs')
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


  //=============================envio de correo
  app.post("/sendEmail",(req,res)=>{
    console.log("sendEmail")
    console.log(req.body)
   
    const vendedorEmail="oscaralonso11@hotmail.com"
    const clienteEmail="oscar.rosete@cetys.mx"//TODO: CAMBIAR A req.body.email cuando este validado el formulario
    const smtpClient={   
        host: "smtp.zoho.com",
        port: 465,
        auth: {
            user:"admin@oscarrosete.com",
            pass:"LiaAshanti1!"
        }
    }

    //=============correo al vendedor
    console.log(req.body)
    const emailContent={
        name:req.body.Nombre,
        email:req.body.Correo,
        phone:req.body.phone,
        topic:"Contacto cliente",
        body:req.body.Mensaje,
        email2:req.body.email,
    }
    const content=htmlContent(emailContent)
    console.log(content)
    let emailInfo={
        to:vendedorEmail,
        subject:"correo importante",
        htmlContent:content,
        smtpClient
    }
    sendEmail(emailInfo);

    //======correo al cliente
    const content2=htmlContent2(emailContent)
    console.log(content2)
    emailInfo={
        to:clienteEmail,
        subject:"correo importante",
        htmlContent:content2,
         // attaching http://localhost:5000/images/LogoColor.png
         attachments: [{
            filename: 'LogoColor.png',
            path:"./public/img/LogoColor.png",
            cid: 'logo', //same cid value as in the html img src
        }],   
        smtpClient
    }
    sendEmail(emailInfo);
    console.log(emailInfo.attachments[0].path)

   
    var tryFetch = {myString: 'I am working fetch'};
    res.status(200).json(tryFetch);
});
  
app.listen(port)