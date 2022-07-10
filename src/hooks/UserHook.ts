import UserModel from "../model/User";
import { openNotification } from "../helper/Notification";
import { useState } from "react";
import { STATUS_CODE } from "../commons/Config";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../apis/UserAPI";
import { handleMapError } from "../helper/Helper";

export interface UseUserResult {
  errorValidate: Map<string, string> | undefined;
  loading: boolean;
  handleSignUpUser(userInput: UserModel.User): void;
}

export function useUserList(): UseUserResult {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorValidate, setErrorValidate] = useState<Map<string, string>>();

  // API create user
  const handleSignUpUser = async (userInput: UserModel.User) => {
    try {
      setLoading(true);
      const payload = await CreateUser(userInput);
      if (payload.status === STATUS_CODE.CREATE_SUCCESS) {
        openNotification("success", "Sign up success");

        // Save local storage
        localStorage.setItem("user_info", JSON.stringify(payload.data));

        // Redirect
        navigate("/standard");
      } else {
        setErrorValidate(handleMapError(payload.data));
      }
    } catch (error: any) {
      openNotification("error", `Error sign up user: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    errorValidate,
    loading,
    handleSignUpUser,
  };
}
