const users = [
  { id: 5, username: "testi2", room: "lol" },
  { id: 5, username: "testi2", room: "lel" },
];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
  // First clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Data validators
  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  // Then check for existing users
  const existingUser = users.find(
    (user) => user.room === room && user.username === username
  );

  // Validating the username
  if (existingUser) {
    return {
      error: "Username is already taken!",
    };
  }

  // Storing the user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  // eslint-disable-next-line no-unused-expressions
  if (index !== -1) users.splice(index, 1)[0];
  else {
    return {
      error: "Username not found!",
    };
  }
};

const getUser = (id) => users.find((userElement) => userElement.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
