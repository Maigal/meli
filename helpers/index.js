/**
 * Divides a price in integer/decimal
 * @param {Number} price Full price (integer + decimal)
 * @param {String} currency Currency of the price to convert
 * @return {Object} Formatted price as needed by the client
*/
const getItemPrice = (price, currency) => {
  const amount = parseInt(price);
  const decimals = (price - amount).toFixed(2) * 100;

  return {
    currency,
    amount,
    decimals
  }
}

module.exports = {
  /**
   * Formats a product in the correct format to serve the search results in the client
   * @param  {Object} item Full item as received from the ML api
   * @return {Object} Formatted product
  */
  formatProductListItem(item) {
    return {
      id: item.id,
      title: item.title,
      price: getItemPrice(item.price, item.currency_id),
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      state_name: item.address.state_name
    }
  },
  /**
   * Formats a product in the correct format to serve the product details in the client
   * @param  {Object} item Full item as received from the ML api
   * @return {Object} Formatted product details
  */
  formatProductDetail(item) {
    return {
      id: item.id,
      title: item. title,
      price: getItemPrice(item.price, item.currency_id),
      picture: item.pictures[0].url || item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: item.productDescription,
      categories: item.productCategories.map(category => category.name),
    }
  }
}
