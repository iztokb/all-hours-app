/**
 * @interface IRating
 * @description
 * Interface that represents the rating result of comparing two strings
 */
export interface IRating {
  target: string;
  rating: number;
}

/**
 * @interface IBestMatch
 * @description
 * Interface that represents the rating result when comparing string against an array of stings
 */
export interface IBestMatch {
  ratings: IRating[];
  bestMatch: IRating;
  bestMatchIndex: number;
}
