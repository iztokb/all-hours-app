export const GenerateGuid = (): string => {
  // This code is based on angular2-uuid project that is not mantained anymore. I've done slight modifications.
  if (
    typeof window !== 'undefined' &&
    typeof window.crypto !== 'undefined' &&
    typeof window.crypto.getRandomValues !== 'undefined'
  ) {
    // If we have a cryptographically secure PRNG, use that
    // http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
    let buf: Uint16Array = new Uint16Array(8);
    window.crypto.getRandomValues(buf);
    return (
      TransformToHex(buf[0]) +
      TransformToHex(buf[1]) +
      '-' +
      TransformToHex(buf[2]) +
      '-' +
      TransformToHex(buf[3]) +
      '-' +
      TransformToHex(buf[4]) +
      '-' +
      TransformToHex(buf[5]) +
      TransformToHex(buf[6]) +
      TransformToHex(buf[7])
    );
  } else {
    // Otherwise, just use Math.random
    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    // https://stackoverflow.com/questions/11605068/why-does-jshint-argue-against-bitwise-operators-how-should-i-express-this-code
    return (
      Random4Chars() +
      Random4Chars() +
      '-' +
      Random4Chars() +
      '-' +
      Random4Chars() +
      '-' +
      Random4Chars() +
      '-' +
      Random4Chars() +
      Random4Chars() +
      Random4Chars()
    );
  }
};

const TransformToHex = (n: number): string => {
  let ret: string = n.toString(16);
  while (ret.length < 4) {
    ret = '0' + ret;
  }
  return ret;
};

const Random4Chars = (): string => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
