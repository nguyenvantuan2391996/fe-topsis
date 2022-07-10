import { openNotification } from "../helper/Notification";
import { useState } from "react";
import { STATUS_CODE } from "../commons/Config";
import StandardModel from "../model/Standard";
import {
  CreateStandard,
  DeleteStandard,
  GetStandards,
} from "../apis/StandardAPI";
import { handleMapError } from "../helper/Helper";

export interface UseStandardResult {
  errorValidate: Map<string, string> | undefined;
  loading: boolean;
  standards: StandardModel.Standard[];
  handleGetStandards(userID: string): void;
  handleCreateStandard(input: StandardModel.StandardBodyRequest): void;
  handleDeleteStandard(standardID: string): void;
}

export function useStandardList(): UseStandardResult {
  const [errorValidate, setErrorValidate] = useState<Map<string, string>>();
  const [loading, setLoading] = useState(false);
  const [standards, setStandards] = useState<StandardModel.Standard[]>([]);

  // API get list standards
  const handleGetStandards = async (userID: string) => {
    try {
      setLoading(true);
      const payload = await GetStandards(userID);
      if (payload.status === STATUS_CODE.SUCCESS) {
        const standardRes = payload.data.map(
          (item: StandardModel.Standard, index: number) => ({
            ...item,
            stt: index + 1,
          })
        );

        localStorage.setItem("standards_info", JSON.stringify(standardRes));
        setStandards(standardRes);
        openNotification("success", "Get standards success");
      } else {
        console.log(payload);
      }
    } catch (error: any) {
      openNotification("error", `Error get standards: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // API create standard
  const handleCreateStandard = async (
    input: StandardModel.StandardBodyRequest
  ) => {
    try {
      setLoading(true);
      const payload = await CreateStandard(input);
      if (payload.status === STATUS_CODE.CREATE_SUCCESS) {
        setErrorValidate(undefined);
        openNotification("success", "Create standard success");
      } else {
        setErrorValidate(handleMapError(payload.data));
      }
    } catch (error: any) {
      openNotification("error", `Error create standard: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // API delete standard
  const handleDeleteStandard = async (standardID: string) => {
    try {
      setLoading(true);
      const payload = await DeleteStandard(standardID);
      if (payload.status === STATUS_CODE.SUCCESS) {
        setErrorValidate(undefined);
        openNotification("success", "Delete standard success");
      } else {
        setErrorValidate(handleMapError(payload.data));
      }
    } catch (error: any) {
      openNotification("error", `Error delete standard: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    errorValidate,
    loading,
    standards,
    handleGetStandards,
    handleCreateStandard,
    handleDeleteStandard,
  };
}
