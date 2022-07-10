import { CreateUser } from "../apis/UserApi";
import UserModel from "../model/User";
import { openNotification } from "../helper/Notification";
import { useState } from "react";
import { STATUS_CODE } from "../commons/Config";
import SlackModel from "../model/Slack";
import { NotifySlack } from "../apis/SlackApi";
import { ToMessageSlackSignUp } from "../helper/SlackHelper";

export interface UseUserResult {
  loading: boolean;
  handleSignUpUser(userInput: UserModel.User): void;
}

export function useUserList(): UseUserResult {
  const [loading, setLoading] = useState(false);
  const handleSignUpUser = async (userInput: UserModel.User) => {
    try {
      setLoading(true);
      const payload = await CreateUser(userInput);
      if (payload.status === STATUS_CODE.CREATE_SUCCESS) {
        openNotification("success", "Sign up success");

        // Notify to slack
        const messageSlack: SlackModel.MessageSignUp = {
          user_name: userInput.user_name,
          phone: userInput.phone,
          email: userInput.email,
          created_at: Date.now(),
        };
        await NotifySlack(ToMessageSlackSignUp(messageSlack));
      } else {
        throw payload.data;
      }
    } catch (error: any) {
      openNotification("error", `Error sign up user: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSignUpUser,
  };
}
