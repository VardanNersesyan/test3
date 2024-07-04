export const parseBoolean = (str) => {
  switch (str.toLowerCase()) {
    case 'true':
    case '1':
      return true;
    default:
      return false;
  }
};
