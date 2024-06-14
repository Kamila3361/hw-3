import axios from 'axios';
import cheerio from 'cheerio';

interface ScrapedData {
    name?: string;
    price?: string;
    location?: string;
}

// The web scraping function
async function ScrapeWebPage(url: string): Promise<string> {
    try {
        // Fetch the webpage
        const response = await axios.get(url);
        // Parse the HTML content of the webpage
        const $ = cheerio.load(response.data);
        
        const scrapedData: ScrapedData[] = [];

        // Use Cheerio to extract the required data
        // Scrape anchor text
        $(`a.css-z3gu2d`).each((i, element) => {
            const text = $(element).text();
            scrapedData.push({ name: text });
        });

        // Scrape span text
        $(`p.css-15fj1il er34gjf0`).each((i, element) => {
            const text = $(element).text();
            scrapedData.push({ price: text });
        });

        // Scrape paragraph text
        $(`p.css-1pzx3wn.er34gjf0`).each((i, element) => {
            const text = $(element).text();
            scrapedData.push({ location: text });
        });

        const jsonData = JSON.stringify(scrapedData, null, 2);
        console.log(jsonData);
        
        return jsonData;
    } catch (error) {
        console.error('Error fetching the webpage:', error);
        throw error;
    }
}

export default ScrapeWebPage;
