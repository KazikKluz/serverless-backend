function Product(title, description, price, count) {
  this.title = title;
  this.description = description;
  this.price = Number(price);
  this.count = Number(count);
}

module.exports = Product;
