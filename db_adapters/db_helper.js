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

  // returns 0 if file does not exist, id if file exists
  async GetFileId(folder, filename) {
    return this.adapter.GetFileId(folder, filename);
  }

  async GetFileInfo(fileId) {
    return this.adapter.GetFileInfo(fileId);
  }

  async CreateFolder(folder) {
    return this.adapter.CreateFolder(folder);
  }

  // returns 0 if folder does not exist, id if folder exists
  async GetFolderId(folder) {
    return this.adapter.GetFolderId(folder);
  }
}

export default DBHelper;