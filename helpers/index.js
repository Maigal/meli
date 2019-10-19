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
