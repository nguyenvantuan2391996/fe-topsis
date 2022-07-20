namespace ScoreRatingModel {
  export interface ScoreRating {
    id?: string;
    user_id?: string;
    metadata: string;
  }

  export interface MetadataStruct {
    name: string;
    standard_name: string;
    score: number;
  }
}

export default ScoreRatingModel;
