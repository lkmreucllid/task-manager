const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lkmreucllid01@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. We are happy to get you onboard.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'lkmreucllid01@gmail.com',
        subject: 'We hate to see you leave.',
        text: `Hello ${name}, Thanks for using our app. Please let us know what we can do to improve the experience!. We hope to see you soon`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}