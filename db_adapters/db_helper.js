import Postgres_DB_Adapter from "./postgres_db_adapter";

class DBHelper {
  constructor(config) {
    switch (config.adapter_type) {
      case 'postgres':
        this.adapter = new Postgres_DB_Adapter(config);
        break;
      default:
        throw new Error(`Unknown DB adapter type: ${config.adapter_type}`);
    }
  }
}

export default DBHelper;