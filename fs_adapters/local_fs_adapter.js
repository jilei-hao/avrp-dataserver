
import AbstractFSAdapter from "./abstract_fs_adapter.js";
import fs from 'fs';

class LocalFSAdapter extends AbstractFSAdapter {
  constructor(config) {
    super(config);
  };

  async createFile(path, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  async moveFile(oldPath, newPath) {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };


  async updateFile(path, newData) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, newData, 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async deleteFile(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };
}


export default LocalFSAdapter;