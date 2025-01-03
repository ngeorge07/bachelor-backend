export default function secondsAfterMidnightToCustomFormat(
  seconds,
  delay: number,
): {
  scheduled: string;
  estimated: string;
} {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0); // Reset time to midnight

  // Add the seconds
  const resultDate = new Date(midnight.getTime() + seconds * 1000);

  // Format the scheduled time
  const day = resultDate.getDate().toString().padStart(2, '0');
  const month = (resultDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = resultDate.getFullYear();
  const hours = resultDate.getHours().toString().padStart(2, '0');
  const minutes = resultDate.getMinutes().toString().padStart(2, '0');
  const secs = resultDate.getSeconds().toString().padStart(2, '0');

  // Create the scheduled time string
  const scheduled = `${day}-${month}-${year} ${hours}:${minutes}:${secs}`;

  // Add delay in minutes to the resultDate
  const estimatedDate = new Date(resultDate);
  estimatedDate.setMinutes(estimatedDate.getMinutes() + delay);

  // Format the estimated time
  const estDay = estimatedDate.getDate().toString().padStart(2, '0');
  const estMonth = (estimatedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const estYear = estimatedDate.getFullYear();
  const estHours = estimatedDate.getHours().toString().padStart(2, '0');
  const estMinutes = estimatedDate.getMinutes().toString().padStart(2, '0');
  const estSecs = estimatedDate.getSeconds().toString().padStart(2, '0');

  // Create the estimated time string
  const estimated = `${estDay}-${estMonth}-${estYear} ${estHours}:${estMinutes}:${estSecs}`;

  return { scheduled, estimated };
}
