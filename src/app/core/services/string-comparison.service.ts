import { Injectable } from '@angular/core';
import { IBestMatch, IRating } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class StringComparisonService extends BaseService {
  constructor() {
    super();
  }

  compareTwoStrings(string1: string, string2: string): number {
    return this._compareTwoStrings(string1, string2);
  }

  findBestMatch(string: string, targetStrings: string[]): IBestMatch {
    return this._findBestMatch(string, targetStrings);
  }

  private _compareTwoStrings(string1: string, string2: string): number {
    string1 = string1.replace(/\s+/g, '');
    string2 = string2.replace(/\s+/g, '');

    // if both are empty strings
    if (!string1.length && !string2.length) {
      return 1;
    }

    // if only one is empty string
    if (!string1.length || !string2.length) {
      return 0;
    }

    // identical
    if (string1 === string2) {
      return 1;
    }

    // both are 1-letter strings
    if (string1.length === 1 && string2.length === 1) {
      return 0;
    }

    // if either is a 1-letter string
    if (string1.length < 2 || string2.length < 2) {
      return 0;
    }

    const firstBigrams = new Map();

    for (let i = 0; i < string1.length - 1; i++) {
      const bigram = string1.substr(i, 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

      firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < string2.length - 1; i++) {
      const bigram = string2.substr(i, 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (string1.length + string2.length - 2);
  }

  private _findBestMatch(string: string, compareTo: string[]): IBestMatch {
    if (!this._areArgsValid(string, compareTo)) {
      throw new Error(
        'Bad arguments: First argument should be a string, second should be an array of strings'
      );
    }

    const ratings: IRating[] = [];
    let bestMatchIndex = 0;

    // Loop through and compare strings
    for (let i = 0; i < compareTo.length; i++) {
      const currentTargetString = compareTo[i];
      const currentRating = this.compareTwoStrings(string, currentTargetString);
      ratings.push({ target: currentTargetString, rating: currentRating });
      if (currentRating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i;
      }
    }

    // Flag best match
    const bestMatch = ratings[bestMatchIndex];

    return { ratings, bestMatch, bestMatchIndex };
  }

  private _flattenDeep(arr: any[]): any {
    return Array.isArray(arr)
      ? arr.reduce((a, b) => a.concat(this._flattenDeep(b)), [])
      : [arr];
  }

  private _areArgsValid(mainString: any, targetStrings: any): boolean {
    if (typeof mainString !== 'string') {
      return false;
    }
    if (!Array.isArray(targetStrings)) {
      return false;
    }
    if (!targetStrings.length) {
      return false;
    }
    if (targetStrings.find((s) => typeof s !== 'string')) {
      return false;
    }
    return true;
  }

  private _letterPairs(str: string): string[] {
    const pairs: string[] = [];
    for (let i = 0, max = str.length - 1; i < max; i++) {
      pairs[i] = str.substring(i, i + 2);
    }
    return pairs;
  }

  private _wordLetterPairs(str: string): any[] {
    const pairs = str.toUpperCase().split(' ').map(this._letterPairs);
    return this._flattenDeep(pairs);
  }
}
