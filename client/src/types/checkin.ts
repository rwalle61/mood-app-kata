export interface CheckIn {
  date: string;
  mood: number;
  feelings: string[];
  comment: string;
}

export type CheckIns = CheckIn[];
