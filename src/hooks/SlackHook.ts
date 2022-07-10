import SlackModel from "../model/Slack";
import { NotifySlack } from "../apis/SlackApi";

export interface UseSlackResult {
  handleNotifySlack(slackChat: SlackModel.SlackChat): void;
}

export function useSlackList(): UseSlackResult {
  const handleNotifySlack = async (slackChat: SlackModel.SlackChat) => {
    await NotifySlack(slackChat);
  };

  return {
    handleNotifySlack,
  };
}
