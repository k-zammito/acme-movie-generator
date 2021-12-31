const Sequelize = require('sequelize');
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_movies'
);

const { STRING, INTEGER } = Sequelize;
const faker = require('faker');

const Movie = conn.define('movie', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  rating: {
    type: INTEGER,
    defaultValue: 3,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

Movie.createMovie = function () {
  return faker.company.catchPhrase();
};

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  // await Movie.create({
  //   name: 'Lord of the Rings: Return Of The King',
  // });

  // await Movie.create({
  //   name: 'Pulp Fuction',
  // });

  // await Movie.create({
  //   name: 'The Matrix',
  //   rating: 5,
  // });

  // await Movie.create({
  //   name: 'The Godfather',
  //   rating: 5,
  // });

  // await Movie.create({
  //   name: 'Taxi Driver',
  //   rating: 5,
  // });

  // await Movie.create({
  //   name: 'V for Vendetta',
  // });

  console.log('...seeded!');
};

module.exports = {
  syncAndSeed,
  models: {
    Movie,
  },
};
