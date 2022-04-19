const resolvers = {
  Query: {
    users: (parent, args, ctx, info) => {
      return ctx.dataSources.usersAPI.getUsers();
    },
    user: (parent, args, ctx, info) => {
      return ctx.dataSources.usersAPI.getUser(args.id);
    }
  },
  Mutation: {
    createUser: async (parent, { user }, ctx, info) => {
      //   await sleep();
      //   console.log(new Date().toISOString());
      const users = ctx.dataSources.usersAPI.createUser(user);
      return users;
    },
    createUser1: async (parent, { user }, ctx, info) => {
      const users = ctx.dataSources.usersAPI.createUser(user);
      return users;
    }
  },
  User: {
    name: (parent, args, ctx, info) => {
      return `${parent.first_name} ${parent.last_name}`;
    }
  }
};

module.exports = resolvers;

function sleep(delay = 30) {
  return new Promise((r) => {
    setTimeout(() => {
      r(true);
    }, delay);
  });
}
