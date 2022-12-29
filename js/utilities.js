class Utilities {
  static toNumber(value) {
    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string' && value.trim() !== '') {
      return Number(value);
    }

    return NaN;
  }

  static numberToLocaleString(value, maxFractionDigits) {
    const number = Utilities.toNumber(value);

    return Number.isNaN(number)
      ? NaN
      : number.toLocaleString(undefined, {
          maximumFractionDigits: maxFractionDigits,
        });
  }
}

export default Utilities;
