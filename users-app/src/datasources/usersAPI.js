let users = require("./MOCK_DATA.json");

class UsersAPI {
  getUsers() {
    return users;
  }

  getUser(id) {
    return users.find((u) => u.id === id);
  }
}

module.exports = UsersAPI;
