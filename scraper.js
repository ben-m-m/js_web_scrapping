const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Source page that contains the news articles to scrape.
const url = 'https://about.fb.com/news/';

async function metaNews() {
    // Download the HTML for the newsroom page.
    const response = await axios.get(url);
    const html = response.data;

    // Load the HTML into Cheerio so we can query it like a lightweight DOM.
    const $ = cheerio.load(html);
    const newsItems = [];

    // Each article excerpt contains the title, publish date, and link.
    $("div.uk-width-3-5.article-excerpt").each(function (index) {
        // Keep the output small and predictable by saving only the first 10 items.
        if (index >= 10) return false;

        const items = $(this);

        // Pull the fields needed from each article card.
        const title = items.find("h3").text().trim();
        const date = items.find("time").text().trim();
        const link = items.find("a").attr("href");

        newsItems.push({ title, date, link });
    });

    // Create the output folder if it does not already exist.
    fs.mkdirSync('metaNews', { recursive: true });

    // Write the scraped articles to a JSON file for later use.
    fs.writeFile('metaNews/metaNews.json', JSON.stringify(newsItems, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Data successfully written to metaNews.json');
        }

        // Print the final dataset in the terminal for a quick inspection.
        console.table(newsItems);
    })
}

// Run the scraper function to execute the scraping process.
metaNews();

//Ben Maina