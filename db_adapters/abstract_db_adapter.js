class AbstractDBAdapter {
  constructor(config) {
    // Implementation goes here
  }

  InsertFile (folder, filename, size_in_bytes) {
    // Implementation goes here
    // return the id of the newly created record
  }

  DeleteFile (fileId) {
    // Implementation goes here
  }

  // when a file is moved, we need to update the internal path
  UpdateFile (fileId, newFolder) {
    // Implementation goes here
  }

  GetFileId (folder, filename) {
    // Implementation goes here
  }

  GetFileInfo (fileId) {
    // Implementation goes here
  }

  CreateFolder (folder) {
    // Implementation goes here
  }

  GetFolderId (folder) {
    // Implementation goes here
  }
  
}

export default AbstractDBAdapter;