class AbstractFSAdapter {
  constructor(config) {
    // Implementation goes here
  }

  // CRUD methods
  // -- Create a file
  createFile(path, filename, content) {
    // Implementation goes here
  }

  // -- Read a file
  readFile(path, filename) {
    // Implementation goes here
  }

  // -- Update a file
  updateFile(path, filename, content) {
    // Implementation goes here
  }

  // -- Delete a file
  deleteFile(path, filename) {
    // Implementation goes here
  }

  // Utility methods
  // -- Move a file
  moveFile(oldPath, newPath) {
    // Implementation goes here
  }

  // -- Check if a file exists
  checkFileExists(path) {
    // Implementation goes here
  }

  // -- Create a directory
  createDir(path) {
    // Implementation goes here
  }


}

export default AbstractFSAdapter;
