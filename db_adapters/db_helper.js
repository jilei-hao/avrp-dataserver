import PostgresDBAdapter from "./postgres_db_adapter.js";

class DBHelper {
  constructor(config) {
    switch (config.adapter_type) {
      case 'postgres':
        this.adapter = new PostgresDBAdapter(config);
        break;
      default:
        throw new Error(`Unknown DB adapter type: ${config.adapter_type}`);
    }
  }

  async InsertFile(folder, filename, size_in_bytes) {
    return this.adapter.InsertFile(folder, filename, size_in_bytes);
  }

  async IsFileExists(internalPath, filename) {
    return this.adapter.IsFileExists(internalPath, filename);
  }
}

export default DBHelper;