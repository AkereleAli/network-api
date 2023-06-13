const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey('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');


    const sendEmail = async(email, subject, message) => {
        try{
            const msg = {
                to: email,
                from: 'info@zulfahgroup.com', 
                subject: subject,
                text:message,
               };
           await sendGrid.send(msg)
            

        }catch(error){
            console.log(error)
        }
       
    }

    module.exports = sendEmail