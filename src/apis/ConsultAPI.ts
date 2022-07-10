import { END_POINT, CONSULTS_POINT } from "./Endpoints";
import axios from "axios";

export async function GetResultConsult(userID: string): Promise<any> {
  try {
    const urlGetResultConsult: string = `${END_POINT}/${CONSULTS_POINT}/${userID}`;
    const { data, status } = await axios.post<string>(urlGetResultConsult, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return { data, status };
  } catch (error: any) {
    return error.response;
  }
}
