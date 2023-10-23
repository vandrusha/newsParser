import {XMLParser} from 'fast-xml-parser';
import alert from './alert.mjs';
import linksValidator from './linksValidator.mjs';
import {valid} from 'node-html-parser';

async function getUrls(rssChannels) {
  const sourceLinks = [];
  for (const channel of rssChannels) {
  //const channel = 'https://www.krakow.pl/feeds/rss/komunikaty/26';
  const rssResponse = await fetch(channel)
    .then(function (rssResponse) {
      switch (rssResponse.status) {
        // status "OK"
        case 200:
          return rssResponse.text();
        // status "Not Found"
        case 404:
          alert(rssResponse)
          throw rssResponse;
      }
    })
    .then(function (template) {
      return template;
    })
    .catch(function (rssResponse) {
      // "Not Found"
      alert(rssResponse.statusText)
      console.log(rssResponse.statusText);
    });
  const rssXml = await rssResponse;
  const xmlParse = new XMLParser();
  const rssParsed = xmlParse.parse(rssXml);
  const links = [];
  const item = rssParsed.rss.channel.item;
  const now = new Date();
  if (Array.isArray(item)) {
  links.push(...item.reduce((acc, item) => {
    const pubDate = new Date(item.pubDate);
    const diffInMins = (now - pubDate) / 60000;
    if (diffInMins < 15) {
      acc.push(item.link);
    }
    return acc;
  }, []));
} else {
  const pubDate = new Date(item.pubDate);
  const diffInMins = (now - pubDate) / 60000;
  if (diffInMins < 15) {
    links.push(item.link);
  }
}
  //console.log(links)
  const validLinks = await linksValidator(links);
  sourceLinks.push(...validLinks);
}
return sourceLinks;
}

export default getUrls;
