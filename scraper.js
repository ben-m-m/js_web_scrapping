const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://about.fb.com/news/';

async function metaNews() {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const newsItems = [];


    $("div.uk-width-3-5.article-excerpt").each(function (index) {

        if (index >= 10) return false;

        const items = $(this);

        const title = items.find("h3").text().trim();
        const date = items.find("time").text().trim();
        const link = items.find("a").attr("href");

        newsItems.push({ title, date, link });
    });


    fs.mkdirSync('metaNews', { recursive: true });
    fs.writeFile('metaNews/metaNews.json', JSON.stringify(newsItems, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Data successfully written to metaNews.json');
        }

        console.table(newsItems);
    })
}

metaNews();