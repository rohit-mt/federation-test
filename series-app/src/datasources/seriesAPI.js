const path = require("path");
const fs = require("fs");

let series = require("./series.json");

const filePath = path.join(__dirname, "./assigned.json");
let assignedData = require(filePath);

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

  assignSeriesToUser(seriesId, userId) {
    const userAssignedData = assignedData.find((s) => s.id === userId);

    if (userAssignedData) {
      if (!userAssignedData.series.includes(seriesId)) {
        userAssignedData.series.push(seriesId);
      }
    } else {
      assignedData.push({ id: userId, series: [seriesId] });
    }

    fs.writeFileSync(filePath, JSON.stringify(assignedData, null, 2));

    return this.getSeriesByUser(userId);
  }
}

module.exports = SeriesAPI;
