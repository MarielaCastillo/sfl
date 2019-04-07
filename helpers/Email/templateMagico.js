exports.htmlContent=(emailContent)=>{
    const htmlContent = `
    <p style="margin-bottom:2rem;">Saludos</p>
    <p><span style="font-weight:bold">${emailContent.name}</span> quiere contactarse con usted </p>
    <p>Su correo electrónico es:<span style="font-weight:bold"> ${emailContent.email}</span></p>
    <p>Su mensaje es el siguiente:</p>
    <p>${emailContent.body}</p>
    <p style="margin-top:3rem;">Atte: Sitio SanFelove</p>
`
    return htmlContent
}
