import { WEBHOOK_SLACK } from "./Endpoints";
import axios from "axios";
import SlackModel from "../model/Slack";

export async function NotifySlack(
  slackChat: SlackModel.SlackChat
): Promise<any> {
  try {
    const webhook: string = WEBHOOK_SLACK.WEBHOOK_SLACK_SIGN_UP;
    const { data } = await axios.post<SlackModel.SlackChat>(
      webhook,
      slackChat,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
