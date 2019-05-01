const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  })
};


const formatMoney = (amount) => {
  return amount.toFixed(2);
}

module.exports = {
  formatDate,
  formatMoney,
};