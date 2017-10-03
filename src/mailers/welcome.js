module.exports = function sendWelcomeEmail(ctx, { user }) {
  return ctx.sendMail('welcome', { to: user.email, subject: 'Welcome to wican!' }, { user });
};
