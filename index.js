#!/usr/bin/env node
import getNews from './getNews.mjs';
import getUrls from './getUrls.mjs';
import translator from './translator.mjs';
import sendMessage from './sender.mjs';
import alert from './alert.mjs';

const timer = ms => new Promise(res => setTimeout(res, ms));

async function main() {
  for (; ;) {
    const channel = 'https://www.krakow.pl/feeds/rss/komunikaty/26';
    const urls = await getUrls(channel);
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
main();
