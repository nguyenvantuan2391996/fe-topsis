import { END_POINT, STANDARDS_POINT } from "./Endpoints";
import axios from "axios";
import StandardModel from "../model/Standard";

export async function GetStandards(userID: string): Promise<any> {
  try {
    const urlGetStandards: string = `${END_POINT}/${STANDARDS_POINT}/${userID}`;
    const { data, status } = await axios.get<string>(urlGetStandards, {
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

export async function CreateStandard(
  standardRequest: StandardModel.StandardBodyRequest
): Promise<any> {
  try {
    const urlCreateStandard: string = `${END_POINT}/${STANDARDS_POINT}`;
    const { data, status } =
      await axios.post<StandardModel.StandardBodyRequest>(
        urlCreateStandard,
        standardRequest,
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

export async function DeleteStandard(standardID: string): Promise<any> {
  try {
    const urlDeleteStandard: string = `${END_POINT}/${STANDARDS_POINT}/${standardID}`;
    const { data, status } = await axios.delete<string>(urlDeleteStandard, {
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
