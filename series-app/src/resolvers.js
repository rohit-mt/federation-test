const resolvers = {
  Query: {
    allSeries: (parent, args, ctx, info) => {
      return ctx.dataSources.seriesAPI.getAllSeries();
    },
    series: (parent, args, ctx, info) => {
      return ctx.dataSources.seriesAPI.getSeries(args.id);
    }
  },
  Mutation: {
    assignSeriesToUser: (parent, { seriesId, userId }, ctx, info) => {
      return ctx.dataSources.seriesAPI.assignSeriesToUser(seriesId, userId);
    }
  },
  User: {
    assignedSeries: (parent, args, ctx, info) => {
      return ctx.dataSources.seriesAPI.getSeriesByUser(parent.id);
    }
  }
};

module.exports = resolvers;
