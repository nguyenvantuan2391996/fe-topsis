export const STATUS_CODE = {
  CREATE_SUCCESS: 201,
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 401,
  SERVER_ERROR: 500,
};

export const MODAL = {
  OK_TEXT: "Confirm",
  CANCEL_TEXT: "Cancel",
};

export const ACTION = {
  ADD: "add",
  SET: "set",
};

export const TITLE_DELETE = (text: string): string => `Delete ${text}`;
export const DELETE_MODAL_TITLE = (text: string): string =>
  `Are you sure you want to permanently delete ${text}?`;
