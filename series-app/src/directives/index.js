const upperDirectiveTransformer = require("./uppercase");

function applyDirectives(schema) {
  let updatedSchema = upperDirectiveTransformer(schema, "upper");
  return updatedSchema;
}

module.exports = applyDirectives;
