const mongoose = require("mongoose");
const crypto = require("crypto");

const CONFIRMATIONS_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  DEACTIVATED: 3,
  BLOCKED: 4,
};

const USER_STATUS = {
  NORMAL: 0,
  RELATED_WITH_SOMEONE: 1,
};

const ROLES = {
  NORMAL_USER: 0,
  SUPER_ADMIN: 1,
  CHATS_ADMIN: 2,
  WOMANS_CONFIRMATIONS_ADMIN: 3,
};

const userSchema = mongoose.Schema(
  {
    gender: {
      type: String,
    },
    phone: {
      type: String,
    },
    rejectionReason: {
      type: String,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },

    profile: {
      type: String,
      required: true,
    },

    hashed_password: {
      type: String,
      required: true,
    },

    salt: String,

    idNumber: {
      type: String,
    },

    role: {
      type: Number,
      default: ROLES.NORMAL_USER,
    },

    idPhoto1: {
      type: String,
    },

    idPhoto2: {
      type: String,
    },

    idNumber: {
      type: String,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },

    confirmed: {
      type: Number,
      default: CONFIRMATIONS_STATUS.PENDING,
    },

    resetPasswordLink: {
      data: String,
      default: "",
    },

    questions: {
      type: Map,
      of: String,
    },

    sentRequests: [
      { type: mongoose.ObjectId, ref: "Request", required: false },
    ],

    recievedRequests: [
      { type: mongoose.ObjectId, ref: "Request", required: false },
    ],

    favourites: [{ type: mongoose.ObjectId, ref: "User", required: false }],

    userStatus: {
      type: Number,
      default: USER_STATUS.NORMAL,
    },
    notifications: [
      { type: mongoose.ObjectId, ref: "Notification", required: false },
    ],
  },
  { timestamps: true, collection: "usersinfo" }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;

    // generate salt
    this.salt = this.makeSalt();

    //encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";

    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);
