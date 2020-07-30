export enum PageTitle {
  CheckIn = 'Check In',
  Insights = 'Mood Insights',
}

export enum Feeling {
  Depressed = 'Depressed',
  Optimistic = 'Optimistic',
  Bored = 'Bored',
  Happy = 'Happy',
}

export interface CheckIn {
  date: Date;
  mood: number;
  feelings: Feeling[];
  comment: string;
}

export type CheckIns = CheckIn[];
