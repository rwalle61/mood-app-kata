export interface CheckIn {
  date: Date;
  mood: number;
  feelings: string[];
  comment: string;
}

export type CheckIns = CheckIn[];
