import { openNotification } from "../helper/Notification";
import { useState } from "react";
import { STATUS_CODE } from "../commons/Config";
import { GetScoreRatings } from "../apis/ScoreRatingAPI";
import ScoreRatingModel from "../model/ScoreRating";

export interface UseScoreRatingResult {
  loading: boolean;
  scoreRatings: any[];
  handleScoreRating(userID: string): void;
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
          data.stt = i + 1;
          data.name = metadataStruct[0].name;
          for (const metadata of metadataStruct) {
            data[metadata.standard_name] = metadata.score;
          }

          scoreRatingRes.push(data);
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

  return {
    loading,
    scoreRatings,
    handleScoreRating,
  };
}
