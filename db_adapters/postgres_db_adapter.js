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
        return res.rows[0].fn_insert_file;
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

  // returns 0 if file does not exist, id if file exists
  async GetFileId (folder, filename) {
    console.log("[postgres_db_adapter::GetFileId] folder: ", folder, ", filename: ", filename);
    return this.pool.query('SELECT * FROM fn_get_file_id($1, $2)', [folder, filename])
      .then(res => {
        if (res.rows.length == 0) {
          return 0;
        }

        return res.rows[0].fn_get_file_id;
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  // returns 0 if folder does not exist, id if folder exists
  async GetFolderId (folder) {
    console.log("[postgres_db_adapter::GetFolderId] folder: ", folder);
    return this.pool.query('SELECT * FROM fn_get_folder_id_from_path($1)', [folder])
      .then(res => {
        if (res.rows.length == 0) {
          return 0;
        }

        return res.rows[0].fn_get_folder_id_from_path;
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  async GetFileInfo (fileId) {
    return this.pool.query('SELECT * FROM fn_get_file_info($1)', [fileId])
      .then(res => {
        if (res.rows.length == 0) {
          throw new Error(`File not found: ${fileId}`);
        }
        // return the result as an object
        return {
          folder: res.rows[0].folder_path,
          filename: res.rows[0].name,
        };
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  async CreateFolder (folder) {
    // call function to create folder in database
    return this.pool.query('SELECT fn_create_folder($1)', [folder])
      .then(res => {
        return res.rows[0].fn_create_folder;
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

}

export default PostgresDBAdapter;