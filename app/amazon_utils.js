var exports = module.exports = {};

exports.getProductIDFromAmazonProductPageUrl = function(url) {
  var re = /amazon.*\/([A-Z0-9]{10})\//;
  var match = re.exec(url);
  if(url.match(re)){
    return match[1];
  }
  else {
    return null;
  }
};

exports.getCountryFromAmazonProductPageUrl = function(url) {
  var re = /amazon(\.co)*\.(uk|fr|de|it|es)/;
  var match = re.exec(url);
  if(url.match(re)){
    return match[2];
  }
  else {
    return null;
  }
};

exports.generateAmazonProductPageUrlForCountry = function(productID, country) {
  var searchUrlPrefix = 'https://www.amazon.';
  var countryDomain = country.toLowerCase();
  if (countryDomain === 'uk') {
    countryDomain = 'co.uk';
  }
  var searchUrlSuffix = '/dp/';
  return searchUrlPrefix + countryDomain + searchUrlSuffix + productID + '/';
};

exports.getPriceFromAmazonProductDetailPage = function(doc) {
  var price = null;
  price = doc.getElementById("priceblock_dealprice");
  if (price === null) {
    price = doc.getElementById("priceblock_ourprice");
  }
  if (price === null) {
    return null;
  }
  return parseFloat(price.innerHTML.replace(',','.').replace(/^\D+/g, ''));
};