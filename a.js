const TelegramBot = require('node-telegram-bot-api');

// === Replace with your actual bot token ===
const token = '7611198846:AAE0s6FPJFbHOOuAjnsc3NKinOlKRGKHjps';

// === Create bot instance ===
const bot = new TelegramBot(token, { polling: true });

// === /start command ===
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeText = `
🦊 *Welcome to HODLFOX!*

🔥 Your crypto companion inside Telegram.

Select an option below 👇
`;

  const options = {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🚀 Start', callback_data: 'start_app' },
          { text: '❓ Help', callback_data: 'help' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, welcomeText, options);
});

// === Handle button actions ===
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const action = query.data;

  if (action === 'start_app') {
    const photoUrl = 'https://i.ibb.co/4pw7wYr/hodlfox-banner.jpg';
    const message = `
🦊 *Welcome to HODLFOX Web App!*

Click below to open HODLFOX inside Telegram 👇
`;

    const button = {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🚀 Open HODLFOX App',
              web_app: {
                url: 'https://storage-hodlswap-iqs2fh-39b519-31-97-60-52.traefik.me/'
              }
            }
          ]
        ]
      }
    };

    await bot.sendPhoto(chatId, photoUrl, { caption: '🔥 Launching HODLFOX...' });
    await bot.sendMessage(chatId, message, button);
  }

  if (action === 'help') {
    const helpText = `
🧠 *HODLFOX Commands:*
- /start → Show start menu
- /echo [text] → Echo your message
- /photo → Send photo
- /audio → Send audio
- /love → Fun interaction
- /editable → Editable text demo
`;

    bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
  }

  bot.answerCallbackQuery(query.id);
});

// === /echo command ===
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

// === Fallback for all other messages ===
bot.on('message', (msg) => {
  if (!msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, '✅ Use /start to see options.');
  }
});
