'use strict';

const validator = require('validator');

module.exports = {

  /**
   * Validate the sign up form
   *
   * @param {object} payload - HTTP body message
   * @returns {object} - Validation result.
   */
  validateSignupForm: function (payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
      isFormValid = false;
      errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
      isFormValid = false;
      errors.password = 'Password must have at least 8 characters.';
    }

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
      isFormValid = false;
      errors.name = 'Please provide your name.';
    }

    if (!isFormValid) {
      message = 'Fix the errors in the form.';
    }

    return {
      success: isFormValid,
      message,
      errors
    };
  },

  /** Validate the login form
   *
   * @param {object} payload - HTTP body message
   * @returns {object} - Validation result
   */
  validateLoginForm: function (payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
      isFormValid = false;
      errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
      isFormValid = false;
      errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
      message = 'Fix the errors in the form.';
    }

    return {
      success: isFormValid,
      message,
      errors
    };
  }
};
