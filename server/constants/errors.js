exports.errorName = {
  UNAUTHORIZED: "UNAUTHORIZED",
  BAD_REQUEST: "BAD_REQUEST",
  SERVER_ERROR: "SERVER_SERVER",
  NOT_FOUND: "NOT_FOUND"
};

exports.errorType = {
  UNAUTHORIZED: {
    message: "Authentication is needed to get response",
    statusCode: 401
  },
  BAD_REQUEST: {
    message: "Provide all required property with specific property",
    statusCode: 400
  },
  NOT_FOUND: {
    message: "User not found",
    statusCode: 404
  },
  SERVER_ERROR: {
    message: "Some internal server error",
    statusCode: 500
  }
};
