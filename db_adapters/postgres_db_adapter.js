import { Pool } from 'pg';


class Postgres_DB_Adapter extends Abstract_DB_Adapter {
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

  InsertFile (internalPath) {
    // Implementation goes here
    // return the id of the newly created record
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

export default Postgres_DB_Adapter;