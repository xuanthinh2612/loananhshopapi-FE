// Create our number formatter.
export const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// trim for shorter product name
export const handleProductName = (productName) => {
  var maxLength = 22;
  if (productName.length >= maxLength) {
    var trimmedString = productName.substring(0, maxLength);
    return `${trimmedString}...`;
  } else {
    return productName;
  }
};
