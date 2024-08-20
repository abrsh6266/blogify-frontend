export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateReadTime = (text) => {
  const wordsPerMinutes = 200;
  const words = text.slice(/\s/g).length;
  const minutes = words / wordsPerMinutes;
  const readTime = Math.ceil(minutes);
  return readTime;
};
