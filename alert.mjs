import creds from './creds.mjs';

const alert = (message) => {
  fetch(`https://api.telegram.org/bot${creds().tg_bot_token}/sendmessage`, {
    method: 'POST',
    body: JSON.stringify({
      'chat_id': '-731887520',
      'parse_mode': 'Markdown',
      'text': `${message}`
    }),
    headers: {
      'Content-type':
        'application/json;charset=UTF-8'
    }
  });
}

export default alert;
