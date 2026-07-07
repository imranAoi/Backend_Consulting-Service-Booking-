import { body, validationResult } from 'express-validator';

const validateBooking = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!data.email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.phone || data.phone.trim().length < 10) {
    errors.push('Phone number is required and must be at least 10 characters');
  }

  if (!data.meetingAgenda || data.meetingAgenda.trim().length < 10) {
    errors.push('Meeting agenda is required and must be at least 10 characters');
  }

  return errors;
};

// Express-validator middleware
const validateBookingRequest = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('meetingAgenda').notEmpty().withMessage('Meeting agenda is required'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => err.msg)
    });
  }
  next();
};

export {
  validateBooking,
  validateBookingRequest,
  handleValidationErrors
};