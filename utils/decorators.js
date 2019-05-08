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

const formatGameTitle = (gameTitle) => (gameTitle) ? gameTitle : "Not Available";

const formatMatchName = (matchName) => (matchName)? matchName : "Not Available";

const formatMoney = (amount) => (amount)? `$${amount.toFixed(2)}` : `$0.00`;

const formatMatchType = (matchType) => (matchType) ? matchType : "Not Available";

const formatParticipants = (matchParticipants) => (matchParticipants) ? matchParticipants : "Not Available";

const formatMatchEntryFee = (matchEntryFee) => (matchEntryFee) ? `$${matchEntryFee.toFixed(2)}` : `$0.00`;

const formatPot = (entryFee, maxParticipants) => {
  if (entryFee && maxParticipants) {
    return `$${(entryFee * maxParticipants).toFixed(2)}`;
  }

  return "$0.00";
};

module.exports = {
  formatDate,
  formatMatchName,
  formatMoney,
  formatGameTitle,
  formatMatchType,
  formatParticipants,
  formatMatchEntryFee,
  formatPot,
};