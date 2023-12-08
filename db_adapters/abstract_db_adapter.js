class Abstract_DB_Adapter {
  constructor(config) {
    // Implementation goes here
  }

  InsertFile (internalPath) {
    // Implementation goes here
    // return the id of the newly created record
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

export default Abstract_DB_Adapter;