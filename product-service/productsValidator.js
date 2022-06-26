const validator = require('validator');

const Product = require('./productModel');

//validate the body data, sent by client, for a new product
function validateProduct(productData) {
  let validatedProduct;

  if (productData === null) {
    console.log('validateProduct(): Parameter is null');
  }

  //validate data for new product fields
  if (
    !validator.isEmpty(productData.title) &&
    (validator.isNumeric(productData.price + '', {
      no_symbols: true,
      allow_negatives: false,
    }) ||
      productData.price === '') &&
    (validator.isNumeric(productData.count + '', {
      no_symbols: true,
      allow_negatives: false,
    }) ||
      productData.count === '')
  ) {
    //validation passed
    validatedProduct = new Product(
      //escape is to sanitize - it removes/ encodes any html tags
      validator.escape(productData.title),
      validator.escape(productData.description),
      productData.price,
      productData.count
    );
  } else {
    //debug
    console.log('validateProduct(): Validation failed');
  }

  return validatedProduct;
}

module.exports = { validateProduct };
