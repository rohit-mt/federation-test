# federation-test

- 2 apps
- 1 gateway
- 1 static server for serving common schema(not needed with fed. 2)

## Setup

```
npm install
npm start
```

## Sample queries

```
mutation CreateUser($seriesId: String, $userId: String, $user: UserInputDetails, $user1: UserInputDetails) {
  abc: createUser(user: $user) {
    name
    username
    id
    emailId
    assignedSeries {
      name
      id
    }
  }

   xyz: createUser1(user: $user1) {
    name
    username
    id
    emailId
    assignedSeries {
      name
      id
    }
  }

  assignSeriesToUser(seriesId: $seriesId, userId: $userId) {
    id
    name
  }
}
```

```
{
  "user": {
    "first_name": "rohit111",
    "last_name": "garg",
    "username": "gargro",
    "emailId": "xyz@gmail.com"
  },
    "user1": {
    "first_name": "rohit1",
    "last_name": "garg",
    "username": "gargro",
    "emailId": "xyz@gmail.com"
  },
  "seriesId": "2",
  "userId": "2",
}
```

```
query Users {
    users {
    name
    username
    emailId
    id
    assignedSeries {
      id
    }
  }
}
```
