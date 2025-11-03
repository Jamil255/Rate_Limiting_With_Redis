import express, { response } from 'express'
import rateLimiter from './middleware/redis.js'
import client from './config/redis.js'
import { getData } from './config/index.js'
import helmet from 'helmet'

const app = express()
const PORT = process.env.PORT || 3000

app.use(helmet())

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"], // block inline JS and external domains
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.get(
  '/',
  rateLimiter({ limit: 10, timer: 60, key: 'product' }),
  async (req, res) => {
    const isExist = await client.get('product')
    if (!isExist) {
      const data = await getData()
      await client.setex('product', 10, JSON.stringify(data))
      return res.json({ response: data })
    }
    res.json({ response: JSON.parse(isExist) })
  }
)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
