namespace StandardModel {
  export interface Standard {
    stt: number;
    id?: string;
    user_id: string;
    standard_name: string;
    weight: number;
  }

  export interface StandardBodyRequest {
    user_id: string;
    standard_name: string;
    weight: number;
    type: string;
  }
}

export default StandardModel;
