// https://www.emailonacid.com/blog/article/email-development/12_things_you_must_know_when_developing_for_gmail_and_gmail_mobile_apps-2/
// https://litmus.com/community/discussions/1500-using-flexbox-in-an-email
exports.htmlContent2=(emailContent)=>{
    const htmlContent2 = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            .img-container {
                position: relative;
                background-color: #24244d;
                display: flex;
                justify-content: center;
                padding: 5vh 0rem;
            }
        
            .myBack{
                max-height: 30vh;
            }
        
            .img-fluid {
                max-width: 100%;
                height: auto;
            }
        
            .logo {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 50%;
            }
        
        
            .green-line {
                border-color: #c6d64f;
                border-width: 0.25rem;
                margin-block-start: 0;
                margin-block-end: 0;
                border-style: solid;
                max-width: 7.5%;
            }
        
            main {
                font-family: 'Arial', sans-serif;
                background-color: #f7f7f7;
            }
        
            .main-content {
                padding: 3rem;
            }
        
            .greeting {
                text-align: center;
                font-size: 2rem;
                margin: 0.5rem;
                font-weight: 500;
            }
        
            .name {
                text-align: center;
                margin: 0;
                font-size: 4rem;
                font-weight: 600;
            }
        
            .message {
                text-align: justify;
                font-size: 2rem;
                margin: 3rem;
                line-height: 3rem;
                font-weight: 500;
            }
        
            footer {
                font-family: 'Abel', sans-serif;
                text-align: center;
            }
        
            .footer-purple {
                background-color: #8d569d;
                padding: 1.5rem 0;
            }
        
            .footer-content {
                background-color: #24244d;
                font-size: 2rem;
                padding: 1.5rem;
                display:flex;
                flex-flow: row wrap;
                justify-content: center
            }
        
            .footer-content p {
                margin: 0;
                color: white;
            }
            .footer-block{
                width:40vw;
            }
            @media only screen and (max-width: 768px) {
                .message{
                    font-size: 1.5rem;
                    line-height:130%;
                }
                .footer-block{
                    width:100vw;
                    margin-bottom: 3vh;
                }
            }
        </style>
        
        <link href="https://fonts.googleapis.com/css?family=Abel" rel="stylesheet">
    </head>
<body>
    <div class="img-container">
        <img class="myBack img-fluid" src="cid:logo" alt="fondo">
    </div>

    <main>
        <div class="main-content">
            <p class="greeting">Buenas tardes,</p>
            <p class="name">${emailContent.name}</p>
            <div>
                <hr class="green-line">
            </div>
            <p class="message">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
        </div>
    </main>
    <footer>
        <div class="footer-purple">
            <div class="footer-content">
                <div class="footer-block">
                    <p>@2019 Fiesta Mágica</p>
                    <a href="mailto:fiestamagica@gmail.com" style="text-decoration: none; color:white"> fiestamagica@gmail.com</a>
                </div>
                <div class="footer-block">
                    <p>Coyoacán, CDMX</p>
                    <p>Tel. 5617-9619 | 55-6611-2854</p>
                </div>
            </div>
        </div>
    </footer>
</body>
`
    return htmlContent2
}

