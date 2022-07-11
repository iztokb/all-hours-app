import isBase64 from 'is-base64';
import jwt_decode from 'jwt-decode';

/**
 * @description
 * Function responsible for substitution of chars that are a no-go for regex
 * @param {string}
 * @returns { string }
 */
export const EscapeRegex = (string: string): string => {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

/**
 * Function responsible for checking if provided string is base64 compliant string or not
 * @param { string } stringToBeChecked
 * @returns { boolean }
 */
export function IsBase64(stringToBeChecked: string): boolean {
  return isBase64(stringToBeChecked);
}

/**
 * @description
 * Function responsible for decoding jwt
 * @param {string } jwt
 * @returns { string }
 */
export function DecodeJwt(jwt: string): string {
  return jwt_decode(jwt);
}
