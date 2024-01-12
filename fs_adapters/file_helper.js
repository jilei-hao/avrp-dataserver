import path from 'path';
import LocalFSAdapter from './local_fs_adapter.js';

class FileHelper {
  constructor(config) {
    switch (config.adapter_type) {
      case 'local':
        this.adapter = new LocalFSAdapter();
        break;
      default:
        throw new Error(`Unknown fs adapter type: ${config.adapter_type}`);
    }

    this.data_root_dir = config.data_root_dir;
  }

  _absolutePath(folder) {
    return path.join(this.data_root_dir, folder);
  }

  async importFile(externalPath, folder, filename) {
    const fullPath = this._absolutePath(path.join(folder, filename));
    return this.adapter.moveFile(externalPath, fullPath);
  }

  async checkFileExists(folder) {
    return this.adapter.checkFileExists(this._absolutePath(folder));
  }

  async readFile(folder, filename) {
    return this.adapter.readFile(this._absolutePath(path.join(folder, filename)));
  }
  
  // delete a file by absolute path
  async deleteFile(absolutePath) {
    return this.adapter.deleteFile(absolutePath);
  }

  // delete an internal file
  async deleteInternalFile(folder, filename) {
    const fullPath = this._absolutePath(path.join(folder, filename));
    return this.adapter.deleteFile(fullPath);
  }

  // create a directory
  async createDir(folder) {
    console.log("createDir: ", folder, this._absolutePath(folder));
    return this.adapter.createDir(this._absolutePath(folder));
  }

}

export default FileHelper;