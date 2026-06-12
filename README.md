# JS Web Scraping

This project is a small Node.js web scraper that collects the latest news items from Meta's newsroom page and saves them as JSON.

## What it does

- Fetches the HTML from https://about.fb.com/news/
- Extracts the first 10 article cards from the page
- Collects the title, publish date, and link for each item
- Writes the result to metaNews/metaNews.json

## Requirements

- Node.js 18 or newer
- npm

## Installation

Install the dependencies from the project root:

```bash
npm install
```

## Running the scraper

Use the provided start script:

```bash
npm start
```

You can also run the scraper directly:

```bash
node scraper.js
```

## Output

When the script finishes, it creates or updates:

- metaNews/metaNews.json

The file contains an array of objects with this structure:

```json
{
	"title": "Article title",
	"date": "Published date",
	"link": "Article URL"
}
```

The script also prints the scraped items to the terminal in a table for quick inspection.

## Project structure

```text
.
├── package.json
├── scraper.js
├── README.md
└── metaNews/
		└── metaNews.json
```

## Notes

- The scraper limits output to the first 10 matching news cards.
- If the newsroom page structure changes, the selector in scraper.js may need to be updated.
