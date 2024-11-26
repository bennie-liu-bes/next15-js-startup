import sql from 'mssql'
import { CONFIG } from '@/config-global'

const sqlConfig = {
  user: CONFIG.MSSQL_USER,
  password: CONFIG.MSSQL_PASSWORD,
  database: CONFIG.MSSQL_DATABASE,
  server: CONFIG.MSSQL_SERVER,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
}

class Database {
  constructor() {
    this.pool = null
  }

  async connect() {
    try {
      if (!this.pool) {
        console.log('建立新的資料庫連接...')
        this.pool = await new sql.ConnectionPool(sqlConfig).connect()
        console.log('資料庫連接成功')
      }
      return this.pool
    } catch (err) {
      throw new Error(`資料庫連接失敗: ${err.message}`)
    }
  }

  async query(queryString, params = {}) {
    try {
      const pool = await this.connect()
      const request = pool.request()

      Object.entries(params).forEach(([key, value]) => {
        request.input(key, value)
      })

      const result = await request.query(queryString)
      return result.recordset
    } catch (err) {
      throw new Error(`資料庫查詢失敗: ${err.message}`)
    }
  }
}

const db = new Database()

export default db
