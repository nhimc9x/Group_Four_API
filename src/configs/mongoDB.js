import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment.js'

let DatabaseInstance = null

const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const CONNECT_DB = async () => {
  await client.connect()
  DatabaseInstance = client.db(env.DATABASE_NAME)
  // console.log(DatabaseInstance)
}

export const GET_DB = () => {
  if (!DatabaseInstance) throw new Error('Cần kết nối Database trước')
  return DatabaseInstance
}

export const CLOSE_DB = async () => {
  await client.close()
}
