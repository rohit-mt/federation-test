const upperDirectiveTransformer = require("./uppercase");

/**
 * todo: add info -
 * https://www.apollographql.com/docs/federation/subgraphs/#custom-directives-in-subgraphs
 */

function applyDirectives(schema) {
  let updatedSchema = upperDirectiveTransformer(schema, "upper");
  return updatedSchema;
}

module.exports = applyDirectives;
