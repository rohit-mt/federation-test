const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./MOCK_DATA.json");

let users = require(filePath);

class UsersAPI {
  getUsers() {
    return users;
  }

  getUser(id) {
    return users.find((u) => u.id === id);
  }

  createUser(userInput) {
    const id = String(users.length + 1);

    const user = {
      ...userInput,
      id
    };

    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return this.getUser(id);
  }
}

module.exports = UsersAPI;
