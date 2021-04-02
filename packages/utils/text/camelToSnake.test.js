const camelToSnake = require('./camelToSnake');

const camelCase = "MyCase";
const snakeCase = "my_case";

describe('camelToSnake',() => {
  it('changes case from camel case to snake case', () => (snakeCase === camelToSnake(camelCase)));
})
