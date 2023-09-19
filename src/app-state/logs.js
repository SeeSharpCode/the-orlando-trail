export function log(message) {
  return { message };
}

export function logRed(message) {
  return { message, className: 'error-text' };
}

export function logGreen(message) {
  return { message, className: 'success-text' };
}
