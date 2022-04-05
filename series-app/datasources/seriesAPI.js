let series = require("./series.json");
let assignedData = require("./assigned.json");

class SeriesAPI {
  getAllSeries() {
    return series;
  }

  getSeries(id) {
    return series.find((s) => s.id === id);
  }

  getSeriesByUser(userId) {
    const userAssignedData = assignedData.find((s) => s.id === userId);
    if (userAssignedData) {
      return userAssignedData.series.map((sId) => this.getSeries(sId));
    }
    return [];
  }
}

module.exports = SeriesAPI;
