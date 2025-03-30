const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors') // Import CORS
require('dotenv').config()
const logger = require('./Logger/logger')
const userRoutes = require('./Routes/userRoutes')

const { collectMetrics, metricsEndpoint } = require('./Middleware/metrics');
const app = express()

// Enable CORS
app.use(cors({
    origin: "https://hack-n-uthon-6-0-pu3p.vercel.app/", // Allow frontend origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Allow cookies & authorization headers
}));

app.use(collectMetrics); 
app.use(express.json())

app.use((req, res, next) => {
    logger.info(req.path, req.method)
    next()
})

app.use(helmet())
app.use(morgan('dev'))

app.get('/metrics', metricsEndpoint);
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            logger.info(`Connected to DB and listening to port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        logger.error(error)
    })