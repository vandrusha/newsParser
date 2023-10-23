import fs from 'fs';
import alert from './alert.mjs';

async function linksValidator(links) {
  const postedLinksFile = fs
    .readFileSync('/Users/ametelsky/Documents/newsParser/postedLinks.json', 'utf8')
  const postedLinks = JSON.parse(postedLinksFile).items;
  const validLinks = links.filter(link => !postedLinks.includes(link));
  const linksArray = [...validLinks, ...postedLinks].slice(0, 50);
  //console.log(linksArray);
  const linksToPreserve = JSON.stringify({items: linksArray});
  fs.writeFile('/Users/ametelsky/Documents/newsParser/postedLinks.json', linksToPreserve, (err) => {
    if (err) alert(err);
  });
  return validLinks;
}

export default linksValidator;