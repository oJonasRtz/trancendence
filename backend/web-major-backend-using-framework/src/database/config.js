import path from 'path';

const config = {
  database: {
    filename: path.join('../../database.sqlite'),
    options: {
      verbose: console.log
    }
  }
};

export default config;
