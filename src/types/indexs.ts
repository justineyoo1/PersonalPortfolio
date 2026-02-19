export interface LeetCodeData {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  submissionCalendar: {
    [timestamp: string]: number;
  };
}
