#!/usr/bin/env node
import getNews from './getNews.mjs';
import getUrls from './getUrls.mjs';
import translator from './translator.mjs';
import sendMessage from './sender.mjs';
import alert from './alert.mjs';

const timer = ms => new Promise(res => setTimeout(res, ms));
const channels = [
  'https://www.krakow.pl/feeds/rss/komunikaty/26',
  'https://www.krakow.pl/feeds/rss/komunikaty/49',
  'https://www.krakow.pl/feeds/rss/komunikaty/2312',
  'https://www.krakow.pl/feeds/rss/komunikaty/29',
  'https://www.krakow.pl/feeds/rss/komunikaty/1912',
  'https://www.krakow.pl/feeds/rss/komunikaty/30',
  'https://www.krakow.pl/feeds/rss/komunikaty/31',
  'https://www.krakow.pl/feeds/rss/komunikaty/32',
  'https://www.krakow.pl/feeds/rss/komunikaty/2163',
  'https://www.krakow.pl/feeds/rss/komunikaty/100'
];

async function main() {
  for (; ;) {
    const urls = await getUrls(channels);
    const news = await getNews(urls);
    const translatedNews = await translator(news);
    //console.log(translatedNews);
    for (const article of translatedNews) {
      await sendMessage(article);
    }
    await timer(600000);
    //alert('minute passed');
  }  
}
await main();
