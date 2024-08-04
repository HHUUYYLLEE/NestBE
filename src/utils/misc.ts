export const randomImageString = (): string => {
  const numbers = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  const letters =
    String.fromCharCode(97 + Math.floor(Math.random() * 26)) +
    String.fromCharCode(97 + Math.floor(Math.random() * 26));
  return letters + numbers;
};
