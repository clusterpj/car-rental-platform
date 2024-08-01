const sequelize = require('./database');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

async function verifyPassword() {
  try {
    await sequelize.sync();

    const user = await User.findOne({ where: { email: 'jisgore@gmail.com' } });
    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('User found:', user.toJSON());

    const inputPassword = '1q2w3e4r';
    const isValid = await bcrypt.compare(inputPassword, user.password);

    console.log('Password verification:', {
      storedHash: user.password,
      inputPassword: inputPassword,
      isValid: isValid
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

verifyPassword();