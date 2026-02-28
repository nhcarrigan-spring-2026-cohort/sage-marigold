const nodemailer = require('nodemailer');


const sendEmail = async (donorEmail, requesterEmail, itemName, pickupInstructions) => {

    const htmlContent =  `
    <div style="font-family:Arial, Helvetica, sans-serif; line-height:1.5; color:#0b1220;">
        <h2 style="margin:0 0 8px 0;">Request Approved ✅</h2>
        <p style="margin:0 0 14px 0;">
        The request for <strong>${itemName}</strong> has been accepted.
        Use the contact info below to coordinate pickup/delivery.
        </p>

        <div style="border:1px solid #e7e9f0; border-radius:12px; padding:12px; margin-bottom:12px;">
        <div style="font-weight:700; margin-bottom:8px;">Contacts</div>
        <div><strong>Donor:</strong> <a href="mailto:${donorEmail}">${donorEmail}</a></div>
        <div><strong>Requester:</strong> <a href="mailto:${requesterEmail}">${requesterEmail}</a></div>
        </div>

        <div style="border:1px solid #e7e9f0; border-radius:12px; padding:12px;">
        <div style="font-weight:700; margin-bottom:8px;">Pickup instructions (private)</div>
        <pre style="margin:0; white-space:pre-wrap; word-wrap:break-word; font-family:ui-monospace, Menlo, Consolas, monospace; font-size:12px;">${pickupInstructions || "No specific instructions provided."}</pre>
        <p style="margin:10px 0 0 0; font-size:12px; color:#475569;">
            Please do not forward publicly.
        </p>
        </div>
    </div>`.trim()


    try {

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    
        // Email content for donor
        const mailToDonor = {
            from: `Helping Hands <${process.env.EMAIL_USER}>`,
            to: donorEmail,
            subject: `Your donation of ${itemName} is ready for next step!`,
            html: htmlContent
        };
    
        // Email content for requester
        const mailToRequester = {
            from: `Helping Hands <${process.env.EMAIL_USER}>`,
            to: requesterEmail,
            subject: `Good news! Your request for ${itemName} has been accepted!`,
            html: htmlContent
        }
    
        const infoMessage = await Promise.all([
            transporter.sendMail(mailToDonor),
            transporter.sendMail(mailToRequester)
        ]);

        console.log("Emails sent: ", infoMessage[0].messageId);
        return true;
    } catch (error) {
        console.error("Error sending emails: ", error);
        return false;
    }
};

module.exports = {
    sendEmail,
};
    