import translatte from 'translatte';
import formatter from './formatter.mjs';
import alert from './alert.mjs';

async function translator(data) {
  const translatedText = [];
  for (const article of data) {
    //console.log(article)
    const title = await translatte(formatter(article.title), {from: 'pl', to: 'be'}).then(res => {
      return res.text;
    }).catch(err => {
      alert(err);
    });
    const shortDescription = await translatte(formatter(article.shortDescription), {from: 'pl', to: 'be'}).then(res => {
      return res.text;
    }).catch(err => {
      alert(err);
    });
    const description = await translatte(formatter(article.description), {from: 'pl', to: 'be'}).then(res => {
      return res.text;
    }).catch(err => {
      alert(err);
    });
    //console.log(description)
    translatedText.push({ ...article, title, description, shortDescription});
  }
  return translatedText;
}
export default translator;

