import _ from 'lodash';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const required = value => (value ? undefined : 'Required');

const spaceTrim = value => (value && value.trim() ? undefined : 'Required');

const password = value => ((/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(value) ? undefined
  : 'Must contain minimum 8 characters, at least a symbol, upper and lower case letters and a number'
);

const maxLength = max => value => (
  value && value.length > max ? `Must be ${max} characters or less` : undefined
);

const minLength = min => (value) => {
  let words = 0;
  if (value) {
    words = value.match(/\S+/g).length;
  }

  return (
    words <= (min - 1) ? `Must be ${min} characters or more` : undefined
  );
};

const exact = length => value => (value.length < length || value.length > length) ? `Must be exact ${length} digits` : undefined;

const exact5 = exact(5);


// eslint-disable-next-line no-restricted-globals
const number = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

const minValue = min => value => (value && value < min ? `Must be at least ${min}` : undefined);

const maxValue = max => value => (value && value > max ? `Must be less than ${max}` : undefined);

const email = value => (EMAIL_REGEX.test(value) ? undefined : 'Email is invalid');

const mustMatch = field => (value, allValues) => {
  const data = allValues;
  return !_.isEmpty(data) && data[field] === value ? undefined : 'Passwords Must Match';
};

const confirmPassword = mustMatch('password');

const maxFileSize = (file = {}) => (file[0] && file[0].size > 10000000 ? 'File size more than 10MB' : undefined);

const errorToFields = (data = {}) => {
  const errors = {};
  if (data) {
    _.forEach(data.errors, (error) => {
      const key = error.source.pointer.replace('/data/attributes/', '');
      const fieldName = _.upperFirst(key.replace('_', ' '));
      errors[key] = `${fieldName} ${error.detail}`;
    });
  }

  return errors;
};

export {
  errorToFields,
  maxValue,
  minValue,
  number,
  required,
  spaceTrim,
  email,
  mustMatch,
  maxFileSize,
  confirmPassword,
  maxLength,
  minLength,
  password,
  exact5,
};
