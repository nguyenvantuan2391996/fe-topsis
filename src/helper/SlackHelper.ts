import SlackModel from "../model/Slack";

export const ToMessageSlackSignUp = (
  messageSignUp: SlackModel.MessageSignUp
): SlackModel.SlackChat => {
  const fields: SlackModel.Field[] = [];
  const userNameField: SlackModel.Field = {
    short: true,
    title: "User name",
    value: messageSignUp.user_name,
  };
  const phoneField: SlackModel.Field = {
    short: true,
    title: "Phone",
    value: messageSignUp.phone,
  };
  const emailField: SlackModel.Field = {
    short: true,
    title: "Phone",
    value: messageSignUp.email,
  };
  const createdAtField: SlackModel.Field = {
    short: true,
    title: "Date Sign Up",
    value: new Date(messageSignUp.created_at).toString(),
  };
  fields.push(userNameField);
  fields.push(phoneField);
  fields.push(emailField);
  fields.push(createdAtField);

  return {
    text: "Registration of a new user",
    attachments: [
      {
        fields: fields,
      },
    ],
  };
};
