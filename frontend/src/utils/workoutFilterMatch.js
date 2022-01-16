function normalizeString (string) {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function nameMatches (workoutFilter, itemName) {
  if (workoutFilter.name === '') {
    return true
  }

  return normalizeString(itemName).includes(normalizeString(workoutFilter.name))
}

export function intervalMatches (workoutFilter, intervalLength) {
  if (workoutFilter.interval === '') {
    return true
  }
  if (workoutFilter.interval === 'lessThan20' && intervalLength < 20) {
    return true
  }
  if (workoutFilter.interval === '20to30' && intervalLength >= 20 && intervalLength <= 30) {
    return true
  }
  if (workoutFilter.interval === '30to60' && intervalLength >= 30 && intervalLength <= 60) {
    return true
  }
  if (workoutFilter.interval === 'moreThan60' && intervalLength > 60) {
    return true
  }

  return false;
}

export function pauseMatches (workoutFilter, pauseLength) {
  if (workoutFilter.pause === '') {
    return true
  }
  if (workoutFilter.pause === 'lessThan10' && pauseLength < 10) {
    return true
  }
  if (workoutFilter.pause === '10to20' && pauseLength >= 10 && pauseLength <= 20) {
    return true
  }
  if (workoutFilter.pause === 'moreThan20' && pauseLength > 20) {
    return true
  }

  return false;
}
