import Telegraph from 'telegra.ph';
import formatter from './formatter.mjs';
import alert from './alert.mjs';
import creds from './creds.mjs';

const accessToken = creds().tg_bot_token;
const client = new Telegraph(accessToken);

async function sendMessage(message) {
  const title = message.title;
  const description = `[{"tag":"p","children":["${message.description}"]}]`;
  //console.log(description);
  const url = await client.createPage(title, description, 'Навiны Кракава')
    .then(res => res.url)
    .catch(err => alert(err))

  fetch(`https://api.telegram.org/bot${creds().tg_access_token}/sendmessage`, {
    method: 'POST',
    body: JSON.stringify({
      'chat_id': '-1002057549117',
      'parse_mode': 'Markdown',
      'text': `${message.shortDescription} [img](${message.pictureLink}) \n\n [Чытаць далей](${url})`
    }),
    headers: {
      'Content-type':
        'application/json;charset=UTF-8'
    }
  })
}
// sendMessage({title:'asd',description:'asd'})
export default sendMessage;
