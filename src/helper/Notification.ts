import { message, ModalFuncProps, Modal as AntModal } from "antd";
import { MODAL } from "../commons/Config";

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

export const showConfirmModal: (props: ModalFuncProps) => void = ({
  okText = MODAL.OK_TEXT,
  cancelText = MODAL.CANCEL_TEXT,
  autoFocusButton = null,
  ...rest
}: ModalFuncProps) => {
  AntModal.confirm({
    okText,
    cancelText,
    autoFocusButton,
    ...rest,
  });
};
