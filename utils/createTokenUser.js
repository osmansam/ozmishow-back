const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
  };
};

module.exports = createTokenUser;
