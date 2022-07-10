import { openNotification } from "../helper/Notification";
import { useState } from "react";
import { STATUS_CODE } from "../commons/Config";
import StandardModel from "../model/Standard";
import { GetResultConsult } from "../apis/ConsultAPI";

export interface UseConsultResult {
  loading: boolean;
  resultConsult: any;
  handleGetResultConsult(userID: string): void;
}

export function useConsultList(): UseConsultResult {
  const [loading, setLoading] = useState(false);
  const [resultConsult, setResultConsult] = useState<any[]>([]);

  // API get list result consult
  const handleGetResultConsult = async (userID: string) => {
    try {
      setLoading(true);
      const payload = await GetResultConsult(userID);
      if (payload.status === STATUS_CODE.SUCCESS) {
        const resultConsultRes = payload.data.map(
          (item: StandardModel.Standard, index: number) => ({
            ...item,
            stt: index + 1,
          })
        );

        setResultConsult(resultConsultRes);
        openNotification("success", "Get result consult success");
      } else {
        console.log(payload);
      }
    } catch (error: any) {
      openNotification("error", `Error get result consult standards: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    resultConsult,
    handleGetResultConsult,
  };
}
