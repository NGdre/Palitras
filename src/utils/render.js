module.exports = function render(req, res, page, args) {
  const { userId } = req.session;
  args.userId = userId;
  res.render(page, args);
};
