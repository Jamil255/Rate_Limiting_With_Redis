import dotenv from 'dotenv'
import Redis from 'ioredis'
dotenv.config()
const client = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})

client.on('connect', () => {
  console.log('Connected to Redis server')
})

client.on('error', (err) => {
  console.error('Redis error:', err)
})
export default client
