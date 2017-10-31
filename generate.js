const faker = require("faker");
const _ = require("lodash");

faker.locale = "en_IND";

module.exports = function() {
  return {
    data: _.times(50, function(index) {
      return {
        id: index,
        // name: faker.name.findName(),
        // productname: faker.internet.productName(),
        // email: faker.internet.email()
        image: faker.image.image(),
        price: faker.commerce.price(),
        description: faker.commerce.productName(),
        category: faker.commerce.department()
      };
    }),
    user: _.times(50, function(index) {
      return {
        id: index,
        name: faker.name.findName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
        address: faker.address.streetAddress(),
        image: faker.image.avatar()
      };
    })
  };
};
