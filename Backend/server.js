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
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: '*',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Add this before your routes
app.options('*', cors());

app.use(collectMetrics); 
app.use(express.json())

app.use((req, res, next) => {
    logger.info(req.path, req.method)
    next()
})

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
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