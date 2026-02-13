const jwt = require('jsonwebtoken');

const generateJWT = (uid, full_name) => {
  const payload = { uid, full_name };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '72h',
      },
      (err, token) => {
        if (err) {
          console.error('Error generating JWT:', err);
          return reject('Could not generate token');
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
