const CustomResponse = {
  status: 0,
  message: "",
  stack: "",
  error: function (status, message, stack) {
    this.status = status;
    this.message = message;
    this.stack = stack;
    return this;
  },
  info: function (status, message) {
    this.status = status;
    this.message = message;
    return { status, message };
  },
};

module.exports = CustomResponse;
