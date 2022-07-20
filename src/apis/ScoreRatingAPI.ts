import { END_POINT, SCORE_RATING_POINT } from "./Endpoints";
import axios from "axios";
import ScoreRatingModel from "../model/ScoreRating";

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

export async function UpdateScoreRatings(
  input: ScoreRatingModel.ScoreRating
): Promise<any> {
  try {
    const urlUpdateScoreRatings: string = `${END_POINT}/${SCORE_RATING_POINT}`;
    const { data, status } = await axios.put<ScoreRatingModel.ScoreRating>(
      urlUpdateScoreRatings,
      input,
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

export async function DeleteScoreRatings(id: string): Promise<any> {
  try {
    const urlDeleteScoreRatings: string = `${END_POINT}/${SCORE_RATING_POINT}/${id}`;
    const { data, status } = await axios.delete<ScoreRatingModel.ScoreRating>(
      urlDeleteScoreRatings,
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

export async function BulkCreateScoreRatings(
  list: ScoreRatingModel.ScoreRating[]
): Promise<any> {
  try {
    const urlBulkCreateScoreRatings: string = `${END_POINT}/${SCORE_RATING_POINT}`;
    const { data, status } = await axios.post<ScoreRatingModel.ScoreRating[]>(
      urlBulkCreateScoreRatings,
      list,
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
