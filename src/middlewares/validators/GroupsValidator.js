const GroupsValidator = {};

GroupsValidator.create = function (request, response, next) {
  const errors = [];
  const { name } = request.body;

  if (name === undefined) {
    errors.push("name is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

GroupsValidator.update = function (request, response, next) {
  const errors = [];
  const { name, id } = request.body;

  if (name === undefined) {
    errors.push("name is required");
  }

  if (id === undefined) {
    errors.push("id is required");
  }

  if (errors.length) {
    return response.json({ errors, data: {}, message: "" });
  }

  next();
};

module.exports = GroupsValidator;
