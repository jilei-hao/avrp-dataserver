class AbstractDBAdapter {
  constructor(config) {
    // Implementation goes here
  }

  InsertFile (folder, filename, size_in_bytes) {
    // Implementation goes here
    // return the id of the newly created record
  }

  IsFileExists (internalPath, filename) {
    // Implementation goes here
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

export default AbstractDBAdapter;