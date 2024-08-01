const sequelize = require('./database');
const User = require('./models/user');

async function checkDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const users = await User.findAll();
    console.log('All users in the database:');
    users.forEach(user => {
      console.log(user.toJSON());
    });

    if (users.length === 0) {
      console.log('No users found in the database.');
    }

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

checkDatabase();