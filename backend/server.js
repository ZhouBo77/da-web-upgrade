import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'da-web-upgrade-backend' })
})

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from backend API' })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`API listening on :${port}`)
})
