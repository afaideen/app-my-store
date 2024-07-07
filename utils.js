function convertTimestampToMalaysianTimeString(timestamp) {
  const date = new Date(timestamp);
  const malaysianTimeString = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);

  return malaysianTimeString;
}



module.exports = { convertTimestampToMalaysianTimeString };