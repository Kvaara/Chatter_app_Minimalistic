const generateMessage = (text) => ({
  text,
  time: new Date().getTime(),
});

const generateLocationMessage = (url) => ({
  url,
  time: new Date().getTime(),
});

module.exports = {
  generateMessage,
  generateLocationMessage,
};
