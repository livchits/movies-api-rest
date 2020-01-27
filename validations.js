const postValidation = {
  title: {
    in: ['body'],
    isLength: {
      errorMessage: 'Title should be at least 2 characters long',
      options: { min: 2 }
    }
  },
  year: {
    in: ['body'],
    isInt: {
      errorMessage: 'Year should be between 1800 and 2020',
      options: { min: 1800, max: 2020 }
    }
  }
};

const putValidation = {
  title: {
    in: ['body'],
    isLength: {
      errorMessage: 'Title should be at least 2 characters long',
      options: { min: 2 }
    },
    optional: true
  },
  year: {
    in: ['body'],
    isInt: {
      errorMessage: 'Year should be between 1800 and 2020',
      options: { min: 1800, max: 2020 }
    },
    optional: true
  }
};

module.exports = { postValidation, putValidation };
