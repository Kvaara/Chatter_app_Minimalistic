const generateMessage = (username, message) => ({
  username,
  message,
  time: new Date().getTime(),
});

const generateLocationMessage = (username, url) => ({
  username,
  url,
  time: new Date().getTime(),
});

module.exports = {
  generateMessage,
  generateLocationMessage,
};
