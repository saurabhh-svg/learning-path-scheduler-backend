require("dotenv").config();

module.exports = {
  db: {
    MONGO_URI:
      "mongodb+srv://devilsaurabh94:V3T4qQCB104L5qLc@scheduler.5yyqp7o.mongodb.net/?retryWrites=true&w=majority",
  },
  general: {
    PORT: 5001 || 5000,
    NODE_ENV: process.env.NODE_ENV,
  },
  auth: {
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
  },
  VALIDATION_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
