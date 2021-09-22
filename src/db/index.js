// index.js
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {mySchema} from './models/schema';
import {dbModels} from './models/index.js';

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  dbName: 'WatermelonDemo',
  schema: mySchema,
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: dbModels,
});

export default database;
