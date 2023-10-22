import {XMLParser} from 'fast-xml-parser';
import alert from './alert.mjs';

async function getUrls(rssChannel) {
  //const channel = 'https://www.krakow.pl/feeds/rss/komunikaty/26';
  const rssResponse = await fetch(rssChannel)
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
  const links = rssParsed.rss.channel.item.reduce((acc, item) => {
    const now = new Date();
    const pubDate = new Date(item.pubDate);
    const diffInMins = (now - pubDate) / 60000;
    if (diffInMins < 800) {
      acc.push(item.link);
    }
    return acc;
  }, []);
  //console.log(links)
  return links;
}
//getUrls();
export default getUrls;
