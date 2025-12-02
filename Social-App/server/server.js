import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import connectDB from './configs/db.js';
import { serve } from 'inngest/express';
import {inngest, functions} from './inngest/index.js';

const app = express()

await connectDB();

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.use('/api/inngest',serve({ client: inngest, functions }))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
