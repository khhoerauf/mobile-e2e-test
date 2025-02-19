export default class Utils {
  getRandomNumber() {
    return Number((Math.random() * 10000).toFixed(2));
  }

  formatNumberToEnUsStandard(valueToFormat) {
    const formatter = Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(valueToFormat);
  }
}
