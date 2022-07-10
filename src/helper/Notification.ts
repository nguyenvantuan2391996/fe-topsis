import { message } from "antd";

export const openNotification: (
  notifyType: "success" | "info" | "warning" | "error",
  description: string
) => void = (
  notifyType: "success" | "info" | "warning" | "error",
  description: string
) => {
  void message[notifyType]({
    content: description,
  });
};
