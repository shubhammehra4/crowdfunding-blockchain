exports.getDeadline = function (hours) {
  return new Date(new Date().setHours(new Date().getHours() + hours)).getTime();
};
