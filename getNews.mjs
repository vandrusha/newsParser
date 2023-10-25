import {parse} from 'node-html-parser';
import alert from './alert.mjs';

async function getNews(urls) {
    const data = [];
    for (const url of urls) {
        const response = await fetch(url)
            .then(function (response) {
                switch (response.status) {
                    // status "OK"
                    case 200:
                        return response.text();
                    // status "Not Found"
                    case 404:
                        alert(response);
                        throw response;
                }
            })
            .then(function (template) {
                return template;
            })
            .catch(function (response) {
                // "Not Found"
                alert(response.statusText)
                console.log(response.statusText);
            });
        const news = await response;
        const dom = parse(news);
        let title = dom
            .getElementsByTagName("div")
            .find(div => div.attributes.class === 'article-title')
            .querySelector("h1")
            .innerText
        let shortDescription = dom
            .getElementsByTagName("div")
            .find(div => div.attributes.class === 'article__description_lead')
            .innerText;
        let description = dom
            .getElementsByTagName("div")
            .find(div => div.attributes.class === 'article__description')
            .innerText;
        let pictureSrc = dom
            .getElementsByTagName("figure")
            .find(div => div.attributes.class === 'article__figure')
            .querySelector("img")
            .rawAttributes
            .src
        title = title ? title : 'Без назвы';
        shortDescription = shortDescription ? shortDescription : title;
        const pictureLink = `https:${pictureSrc}`;
        data.push({title, shortDescription, description, pictureLink, originalUrl: url});
    }
    return data;
}
//getNews(['https://www.krakow.pl/aktualnosci/276353,26,komunikat,ostatni_zamowiony_lajkonik_dotarl_do_krakowa.html']);
export default getNews;

