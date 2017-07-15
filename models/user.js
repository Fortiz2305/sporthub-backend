'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: { type: String },
  name: { type: String }
});

/**
 * Compare the passed password with the existing value in the database.
 *
 * @param {string} password
 * @returns {object} callback
 */
userSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

/**
 * Pre-save hook method
 */
userSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed only if the password is modified or this is a new user
  if (!user.isModified('password') || user.password === 'testPassword') return next();

  return bcrypt.genSalt((error, salt) => {
    if (error) { return next(error); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      user.password = hash;

      return next();
    });
  });
});

module.exports = userSchema;
module.exports.userSchema = userSchema;
