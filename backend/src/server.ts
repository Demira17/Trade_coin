import 'reflect-metadata'
import dotenv from 'dotenv'
import app from './app'
import { AppDataSource } from './data-source'

dotenv.config()


const PORT = Number(process.env.PORT) || 3000

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        console.error('Error during Data Source initialization:', err)
        process.exit(1)
    })
