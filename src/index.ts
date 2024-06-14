import 'dotenv/config';
import express from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';
import { Server } from "socket.io";
import ScrapeWebPage from './scraper/scraper';

const app = express();
const PORT = 3000;

app.use(logger);
app.use(express.json());
app.use('/api/',globalRouter);


app.get('/scraper', async (request,response) =>{
  try {
    const data = await ScrapeWebPage("https://www.olx.kz/");
    response.json(JSON.parse(data)); // Parse the JSON string back to an object
  } catch (error) {
    response.status(500).json({ error: 'Error scraping the web page' });
  }
})

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
