class AbstractFSAdapter {
  constructor(config) {
    // Implementation goes here
  }

  // Create a file
  createFile(relativePath, content) {
    // Implementation goes here
  }

  // Move a file
  importFile(externalPath, relativePath, filename) {
    // Implementation goes here
  }

  // Read a file
  readFile(relativePath) {
    // Implementation goes here
  }

  // Update a file
  updateFile(relativePath, content) {
    // Implementation goes here
  }

  // Delete a file
  deleteFile(relativePath) {
    // Implementation goes here
  }

}

export default AbstractFSAdapter;
