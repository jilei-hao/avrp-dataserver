import AbstractDBAdapter from './abstract_db_adapter.js';
import pkg from 'pg';
const { Pool } = pkg;


class PostgresDBAdapter extends AbstractDBAdapter {
  constructor(config) {
    super(config);
    this.type = 'postgres';
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
    });
  }

  async InsertFile (folder, filename, size_in_bytes) {
    // call function to insert file into database
    return this.pool.query('SELECT fn_insert_file($1, $2, $3)', [folder, filename, size_in_bytes])
      .then(res => {
        console.log(res.rows[0]);
        return res.rows[0].fn_insert_file;
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  async IsFileExists (internalPath, filename) {
    // call function to check existence of file in database
    return this.pool.query('SELECT fn_is_file_exists($1, $2)', [internalPath, filename])
      .then(res => {
        console.log(res.rows[0]);
        return res.rows[0].fn_is_file_exists;
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  DeleteFile (fileId) {
    // Implementation goes here
  }

  // when a file is moved, we need to update the internal path
  UpdateFile (fileId, newInternalPath) {
    // Implementation goes here
  }

  GetFileId (internalPath) {
    // Implementation goes here
  }
}

export default PostgresDBAdapter;