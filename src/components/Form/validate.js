// Validation.js
const defaultRules = {
  required: {
    value: true,
    message: 'This field is required',
  },
  minLength: {
    value: 3,
    message: 'This field must be at least 3 characters long',
  },
  pattern: {
    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
    message: 'Invalid format',
  },
};

export const validationRules = [
  {
    field: 'name',
    rules: [
      {required: 'Name is required'},
      {
        minLength: {
          value: 3,
          message: 'Name must be at least 3 characters long',
        },
      },
    ],
  },
  {
    field: 'email',
    rules: [
      {required: 'Email is required'},
      {
        pattern: {
          value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
          message: 'Invalid email address',
        },
      },
    ],
  },
  // Diğer alanlar için de kurallar eklenebilir
];

class Validation {
  static getRules(fieldName) {
    const field = validationRules.find(
      fieldItem => fieldItem.field === fieldName,
    );
    if (field) {
      return field.rules.reduce((acc, rule) => ({...acc, ...rule}), {});
    }
    return {};
  }

  static convertValidationRules(rules) {
    return rules.reduce(
      (acc, rule) => ({
        ...acc,
        ...rule,
        message: rule.message || 'Bu alan zorunludur.',
      }),
      {},
    );
  }

  static getDefaultRule(ruleName) {
    return defaultRules[ruleName] || {};
  }
}

export default Validation;
