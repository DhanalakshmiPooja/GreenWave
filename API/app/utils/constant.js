exports.config = {
  PORT: 8000,
  database: {
    host: "127.0.0.1",
    port: 27017,
    db: "greenWave_task",
  },
  HTML_STATUS_CODE: {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    UNAUTHORIZED: 401,
    ALREADY_EXISTS: 403,
    INVALID_DATA: 406,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
  },
};
