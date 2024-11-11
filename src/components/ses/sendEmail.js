import { SES } from '@aws-sdk/client-ses';


export async function sendEmail({ emailHtml, emailSubject, emailTo, attachments }) {
    const ses = new SES({ 
        credentials: {
            accessKeyId: process.env.REACT_APP_ACCESSKEYID,
            secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
        },
        region: process.env.REACT_APP_REGION, 
    })

    const params = {
        Source: process.env.REACT_APP_SES_SOURCE_EMAIL,
        Destination: {
            ToAddresses: emailTo,
        },
        Message: {
            Body: {
            Html: {
                Charset: 'UTF-8',
                Data: emailHtml,
            },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: emailSubject,
            },
            Attachments: attachments,
        },
    };

    try {
        const data = await ses.sendEmail(params);
        console.log(data);
    } catch (err) {
        console.error(err, err.stack);
    }
}
