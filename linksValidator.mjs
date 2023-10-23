import fs from 'fs';
import alert from './alert.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = 'postedLinks.json';
// const filePath = path.resolve(dirName, fileName);
// const lnks = fs
// .readFileSync(filePath, 'utf8')

async function linksValidator(links) {
  const postedLinksFile = fs
  .readFileSync(path.resolve(__dirname, fileName), 'utf8')
  const postedLinks = JSON.parse(postedLinksFile).items;
  const validLinks = links.filter(link => !postedLinks.includes(link));
  const linksArray = [...validLinks, ...postedLinks].slice(0, 50);
  //console.log(linksArray);
  const linksToPreserve = JSON.stringify({items: linksArray});
  fs.writeFile(path.resolve(__dirname, fileName), linksToPreserve, (err) => {
    if (err) alert(err);
  });
  return validLinks;
}

export default linksValidator;