import path from 'path';
import LocalFSAdapter from './local_fs_adapter.js';

class FileHelper {
  constructor(config) {
    switch (config.adapter_type) {
      case 'local':
        this.adapter = new LocalFSAdapter();
        break;
      default:
        throw new Error(`Unknown adapter type: ${config.adapter_type}`);
    }

    this.data_root_dir = config.data_root_dir;
  }

  _absolutePath(internalPath) {
    return path.join(this.data_root_dir, internalPath);
  }

  async importFile(externalPath, internalPath, filename) {
    const fullPath = this._absolutePath(path.join(internalPath, filename));
    return this.adapter.moveFile(externalPath, fullPath);
  }

  async checkFileExists(internalPath) {
    return this.adapter.checkFileExists(this._absolutePath(internalPath));
  }
}

export default FileHelper;