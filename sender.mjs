import Telegraph from 'telegra.ph';
import formatter from './formatter.mjs';
import alert from './alert.mjs';
import creds from './creds.mjs';

const accessToken = creds().tg_access_token;
const client = new Telegraph(accessToken);

async function sendMessage(message) {
  const title = message.title;
  const description = `[{"tag":"p","children":["${formatter(message.description)} \n\n Арыгiнал: ${message.originalUrl}"]}]`;
  //console.log(description);

  const url = await client.createPage(title, description, 'Навiны Кракава')
    .then(res => res.url)
    .catch(err => alert(err))

  g
  // await fetch(`https://api.telegram.org/bot${creds().tg_test_bot_token}/sendmessage`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     'chat_id': '-731887520',
  //     'parse_mode': 'Markdown',
  //     'text': `${message.shortDescription} [img](${message.pictureLink})\n [Арыгiнал](${message.originalUrl}) \n\n [Чытаць далей](${url})`
  //   }),
  //   headers: {
  //     'Content-type':
  //       'application/json;charset=UTF-8'
  //   }
  // })
  //   .then(function (rssResponse) {
  //     switch (rssResponse.status) {
  //       // status "OK"
  //       case 200:
  //         return rssResponse.text();
  //       // status "Not Found"
  //       case 404:
  //         alert(rssResponse)
  //         throw rssResponse;
  //     }
  //   })
  //   .then(function (template) {
  //     return template;
  //   })
  //   .catch(function (rssResponse) {
  //     // "Not Found"
  //     alert(rssResponse.statusText)
  //     console.log(rssResponse.statusText);
  //   });
}
// sendMessage({title: 'asd', description: 'asd', pictureLink: 'https://', originalUrl: 'https://', url: 'https://'});

export default sendMessage;
