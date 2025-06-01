import express from 'express'
import cors from 'cors'
import path from 'path'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api', routes)

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err)
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' })
})

export default app
