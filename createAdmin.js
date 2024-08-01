const sequelize = require('./database');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

async function createRandomAdminUser() {
  try {
    await sequelize.sync({ force: false });

    const randomString = Math.random().toString(36).substring(7);
    const email = `admin_${randomString}@example.com`;
    const username = `admin_${randomString}`;
    const plainPassword = 'password123';

    console.log('Creating user with:', { email, username, plainPassword });

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('Hashed password:', hashedPassword);

    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        username,
        password: hashedPassword,
        role: 'admin'
      }
    });

    if (created) {
      console.log('User created in database:', newUser.toJSON());
    } else {
      console.log('User already exists:', newUser.toJSON());
    }

    // Verify the password with the fetched user
    const dbVerification = await newUser.isValidPassword(plainPassword);
    console.log('Database verification result:', dbVerification);

    console.log('Use these credentials to log in:');
    console.log('Email:', email);
    console.log('Password:', plainPassword);

  } catch (error) {
    console.error('Error creating random admin user:', error);
  } finally {
    await sequelize.close();
  }
}

createRandomAdminUser();