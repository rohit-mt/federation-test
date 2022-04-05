const resolvers = {
  Query: {
    allSeries: (parent, args, ctx, info) => {
      return ctx.dataSources.seriesAPI.getAllSeries();
    },
    series: (parent, args, ctx, info) => {
      return ctx.dataSources.seriesAPI.getSeries(args.id);
    }
  },
  User: {
    assignedSeries: (parent, args, ctx, info) => {
      return ctx.dataSources.seriesAPI.getSeriesByUser(parent.id);
    }
  }
};

module.exports = resolvers;
