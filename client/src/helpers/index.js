export const getFormattedPrice = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}