import { format, parseISO, fromUnixTime } from 'date-fns';

export function formatDate(date) {
  if (typeof date === 'string') {
    date = parseISO(date);
  }
  return format(date, 'dd-MM-yyyy H:mm');
}

export function fromUnixTimeStamp(time) {
  let date = fromUnixTime(time / 1000);
  return format(date, 'd. M. Y HH:mm');
}

export function secondsToTimeString(allSeconds) {
  const minutes = Math.floor(allSeconds / 60);
  const seconds = allSeconds % 60;

  return ( seconds < 10 ? (minutes + ':0' + seconds) : (minutes + ':' + seconds))
  
  //minutes + ':' + seconds;
}
