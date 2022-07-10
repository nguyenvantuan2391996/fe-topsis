import { END_POINT, SCORE_RATING_POINT } from "./Endpoints";
import axios from "axios";

export async function GetScoreRatings(userID: string): Promise<any> {
  try {
    const urlGetScoreRatings: string = `${END_POINT}/${SCORE_RATING_POINT}/${userID}`;
    const { data, status } = await axios.get<string>(urlGetScoreRatings, {
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
