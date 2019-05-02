const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }) + " Pacific"
};

const formatMatchName = (matchName) => {
  return (matchName)? matchName : "No Match Name Provided";
};


const formatMoney = (amount) => {
  return amount.toFixed(2);
}

module.exports = {
  formatDate,
  formatMatchName,
  formatMoney
};