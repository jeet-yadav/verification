import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationCode) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ),
      category: "Email verification",
    });

    console.log("Email sent successfully ", response);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const sendWelcomeEmail = async (email, name) => { 
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "0b5abd2f-10c5-4568-8342-b813063a9874",
      template_variables: {
        company_info_name: "AUTH",
        name: name,
      },
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};
