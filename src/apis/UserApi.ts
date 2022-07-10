import { END_POINT } from "./Endpoints";
import axios from "axios";
import UserModel from "../model/User";

export async function CreateUser(userParam: UserModel.User): Promise<any> {
  try {
    const urlCreateUser: string = END_POINT + "user";
    const { data, status } = await axios.post<UserModel.User>(
      urlCreateUser,
      userParam,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return { data, status };
  } catch (error: any) {
    return error.response;
  }
}
