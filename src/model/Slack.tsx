namespace SlackModel {
  export interface Field {
    short: boolean;
    title: string;
    value: string;
  }

  export interface Attachment {
    fields: Field[];
  }

  export interface SlackChat {
    text: string;
    attachments: Attachment[];
  }

  export interface MessageSignUp {
    user_name: string;
    phone: string;
    email: string;
    created_at: number;
  }
}

export default SlackModel;
