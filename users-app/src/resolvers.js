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
    createUser: (parent, { user }, ctx, info) => {
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
