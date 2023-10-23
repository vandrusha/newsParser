import fs from 'fs';
import alert from './alert.mjs';

async function linksValidator(links) {
const postedLinks = await fs.readFile('./postedLinks.json', 'utf8', function (err, data) {
  if (err) alert(err);
  //console.log(data)
  return JSON.parse(data);
});
 //console.log(postedLinks);
 }
linksValidator();

export default linksValidator;