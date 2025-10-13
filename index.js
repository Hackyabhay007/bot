const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// === Bot Config ===
const BOT_TOKEN = "7611198846:AAE0s6FPJFbHOOuAjnsc3NKinOlKRGKHjps";
const WEB_APP_URL = "https://hodlfox.netlify.app";
const TELEGRAM_CHANNEL = "https://t.me/hodlfox_bot";
const LOCAL_IMAGE = "logo.png"; // make sure this file exists

// === Create bot instance ===
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// === Track users who received the image ===
const usersSeen = new Set();

// === /start handler ===
bot.onText(/\/start.*/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username || msg.chat.first_name || 'User';

  // Extract referral code if any
  let referralId = "";
  if (msg.text.includes("=")) {
    referralId = msg.text.split("=")[1];
  } else {
    const parts = msg.text.split(" ");
    if (parts.length > 1) referralId = parts[1];
  }

  const welcomeText = `
🦊 *Welcome to HODLFOX, ${username}!*

🔥 Your crypto companion inside Telegram.

Select an option below 👇
`;

  const webAppUrl = referralId
    ? `${WEB_APP_URL}home/${chatId}/${referralId}`
    : `${WEB_APP_URL}home/${chatId}`;

  const keyboard = {
    inline_keyboard: [
      [{ text: "🚀 Open HODLFOX App", web_app: { url: webAppUrl } }],
      [{ text: "📢 Join Our Channel", url: TELEGRAM_CHANNEL }]
    ]
  };

  try {
    // Send image only if the user hasn't seen it
    if (!usersSeen.has(chatId) && fs.existsSync(LOCAL_IMAGE)) {
      await bot.sendPhoto(chatId, LOCAL_IMAGE, {
        caption: welcomeText,
        parse_mode: "Markdown",
        reply_markup: keyboard
      });
      usersSeen.add(chatId); // mark user as seen
    } else {
      await bot.sendMessage(chatId, welcomeText, {
        parse_mode: "Markdown",
        reply_markup: keyboard
      });
    }
  } catch (err) {
    console.error("Error sending /start message:", err);
    await bot.sendMessage(chatId, "❌ Something went wrong. Please try again later.");
  }
});

// === /help handler ===
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpText = `
🧠 *HODLFOX Commands:*
- /start → Show start menu
- /help → Show this help message
`;

  const keyboard = {
    inline_keyboard: [
      [{ text: "🚀 Start Bot", callback_data: "start_app" }],
      [{ text: "📢 Join Channel", url: TELEGRAM_CHANNEL }]
    ]
  };

  bot.sendMessage(chatId, helpText, { parse_mode: "Markdown", reply_markup: keyboard });
});

// === callback buttons ===
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const action = query.data;

  if (action === "start_app") {
    const webAppUrl = `${WEB_APP_URL}home/${chatId}`;
    const keyboard = {
      inline_keyboard: [
        [{ text: "🚀 Open HODLFOX App", web_app: { url: webAppUrl } }],
        [{ text: "📢 Join Channel", url: TELEGRAM_CHANNEL }]
      ]
    };
    bot.sendMessage(chatId, "🔥 Launching HODLFOX App...", { reply_markup: keyboard });
  }

  bot.answerCallbackQuery(query.id);
});

// === /echo command ===
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

// === fallback messages ===
bot.on("message", (msg) => {
  if (!msg.text.startsWith("/")) {
    bot.sendMessage(msg.chat.id, "✅ Use /start to see options.");
  }
});

console.log("🤖 HODLFOX Bot is running...");
