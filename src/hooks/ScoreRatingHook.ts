import { openNotification } from "../helper/Notification";
import { useState } from "react";
import { STATUS_CODE } from "../commons/Config";
import { GetScoreRatings, UpdateScoreRatings } from "../apis/ScoreRatingAPI";
import ScoreRatingModel from "../model/ScoreRating";
import StandardModel from "../model/Standard";

export interface UseScoreRatingResult {
  loading: boolean;
  scoreRatings: any[];
  handleScoreRating(userID: string): void;
  handleUpdateScoreRating(input: ScoreRatingModel.ScoreRating): void;
  addStateScoreRating(input: any): void;
}

export function useScoreRatingList(): UseScoreRatingResult {
  const [loading, setLoading] = useState(false);
  const [scoreRatings, setScoreRatings] = useState<any[]>([]);

  // API get list result consult
  const handleScoreRating = async (userID: string) => {
    try {
      setLoading(true);
      const payload = await GetScoreRatings(userID);
      if (payload.status === STATUS_CODE.SUCCESS) {
        const scoreRatingRes: any[] = [];
        for (let i = 0; i < payload.data.length; i++) {
          const metadataStruct: ScoreRatingModel.MetadataStruct[] = JSON.parse(
            payload.data[i].metadata
          );

          let data: any = {};
          data.id = payload.data[i].id;
          data.stt = i + 1;
          data.name = metadataStruct[0].name;
          for (const metadata of metadataStruct) {
            data[metadata.standard_name] = metadata.score;
          }

          scoreRatingRes.push(data);
        }

        // If standard_name is not existed in score rating
        const standards: StandardModel.Standard[] = JSON.parse(
          localStorage.getItem("standards_info") as string
        );
        for (const st of standards) {
          for (const sr of scoreRatingRes) {
            if (!sr[st.standard_name]) {
              sr[st.standard_name] = 0;
            }
          }
        }

        setScoreRatings(scoreRatingRes);
        openNotification("success", "Get score ratings success");
      } else {
        console.log(payload);
      }
    } catch (error: any) {
      openNotification("error", `Error get score ratings: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateScoreRating = async (
    input: ScoreRatingModel.ScoreRating
  ) => {
    try {
      setLoading(true);
      const payload = await UpdateScoreRatings(input);
      if (payload.status === STATUS_CODE.SUCCESS) {
        openNotification("success", "Update score rating success");
      } else {
        console.log(payload);
      }
    } catch (error: any) {
      openNotification("error", `Error update score rating: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const addStateScoreRating = (input: any) => {
    setScoreRatings([...scoreRatings, input]);
  };

  return {
    loading,
    scoreRatings,
    handleScoreRating,
    handleUpdateScoreRating,
    addStateScoreRating,
  };
}
