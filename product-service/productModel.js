function Product(
  title,
  description,
  price,
  count,
  imageurl = 'https://imagesfe.s3.eu-west-1.amazonaws.com/generic.webp'
) {
  this.title = title;
  this.description = description;
  this.price = Number(price);
  this.count = Number(count);
  this.imageurl = imageurl;
}

module.exports = Product;
