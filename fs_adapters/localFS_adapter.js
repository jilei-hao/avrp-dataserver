
import AbstractFSAdapter from "./abstract_fs_adapter.js";
import fs from 'fs';
import path from 'path';

class LocalFSAdapter extends AbstractFSAdapter {
  constructor(config) {
    super(config);
    this.root_dir = config.root_dir;
  };

  async createFile(relativePath, content) {
    const fullPath = path.join(this.root_dir, relativePath);
    return new Promise((resolve, reject) => {
      fs.writeFile(fullPath, content, 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  async importFile(externalPath, relativePath, filename) {
    const newFullPath = path.join(this.root_dir, relativePath, filename);
    return new Promise((resolve, reject) => {
      fs.rename(externalPath, newFullPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async readFile(relativePath) {
    const fullPath = path.join(this.root_dir, relativePath);
    return new Promise((resolve, reject) => {
      fs.readFile(fullPath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };


  async updateFile(relativePath, newData) {
    const fullPath = path.join(this.root_dir, relativePath);
    return new Promise((resolve, reject) => {
      fs.writeFile(fullPath, newData, 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async deleteFile(relativePath) {
    const fullPath = path.join(this.root_dir, relativePath);
    return new Promise((resolve, reject) => {
      fs.unlink(fullPath, (err) => {
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