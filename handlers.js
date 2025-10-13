const fs = require('fs');

const WEB_APP_URL = process.env.WEB_APP_URL;

const startHandler = async (bot, msg) => {
  try {
    const chatId = msg.chat.id;
    const username = msg.chat.username || msg.chat.first_name || 'User';

    let referralId = '';

    // Extract referral ID from the text message
    const textParts = msg.text.split(' ');
    if (textParts.length > 1) {
      referralId = textParts[1];
    }

    console.log('User started bot:', {
      chatId,
      username,
      referralId: referralId || 'none'
    });
    
    // Personalized welcome message
    const welcomeMessage = `${username}, Welcome to HodlSwap!`;
    const description = `HodlSwap is like a treasure hunt for tokens! Users can earn them by using different mining app features. And guess what? The players get most of the tokens!

Let's gather your squad! More buddies mean more coins.

Let's make it rain!`;

    // Build the web app URL
    const webAppUrl = referralId 
      ? `${WEB_APP_URL}/home/${chatId}/${referralId}` 
      : `${WEB_APP_URL}/home/${chatId}`;

    // Check if image file exists
    const imagePath = 'hodlswap_image.png';
    const imageExists = fs.existsSync(imagePath);

    if (imageExists) {
      // Send the welcome message with image, text, and buttons
      await bot.sendPhoto(chatId, imagePath, {
        caption: `${welcomeMessage}\n\n${description}`,
        reply_markup: {
          inline_keyboard: [
            [{ text: '🎮 Play Now', web_app: { url: webAppUrl } }],
            [{ text: '📢 Join Our Channel', url: 'https://t.me/hodlswap' }]
          ]
        }
      });
    } else {
      // Send message without image if file doesn't exist
      await bot.sendMessage(chatId, `${welcomeMessage}\n\n${description}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🎮 Play Now', web_app: { url: webAppUrl } }],
            [{ text: '📢 Join Our Channel', url: 'https://t.me/hodlswap' }]
          ]
        }
      });
    }
  } catch (error) {
    console.error('Error in startHandler:', error);
    await bot.sendMessage(chatId, 'Sorry, something went wrong. Please try again later.');
  }
};

const helpHandler = async (bot, msg) => {
  try {
    const chatId = msg.chat.id;
    const helpMessage = `
🤖 *HodlSwap Bot Help*

Welcome to HodlSwap - Your gateway to earning tokens!

*Available Commands:*
/start - Start the bot and access the HodlSwap platform
/help - Show this help message

*How to Use:*
1. Click on "Play Now" to open the HodlSwap web app
2. Complete tasks and mine tokens
3. Invite friends to earn more rewards!

*Need Support?*
Join our community channel for updates and support.
    `;

    await bot.sendMessage(chatId, helpMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🎮 Start Bot', callback_data: '/start' }],
          [{ text: '📢 Join Community', url: 'https://t.me/hodlswap' }]
        ]
      }
    });
  } catch (error) {
    console.error('Error in helpHandler:', error);
    await bot.sendMessage(chatId, 'Sorry, something went wrong. Please try /start to begin.');
  }
};

const webAppDataHandler = async (bot, msg) => {
  try {
    const chatId = msg.chat.id;
    
    // Handle data received from the web app
    console.log('Web App Data received:', msg.web_app_data);
    
    // You can parse and process the data here
    const data = JSON.parse(msg.web_app_data.data);
    console.log('Parsed data:', data);
    
    // Send confirmation to user
    await bot.sendMessage(chatId, '✅ Data received successfully!');
  } catch (error) {
    console.error('Error in webAppDataHandler:', error);
    await bot.sendMessage(chatId, '❌ Error processing data.');
  }
};

module.exports = {
  startHandler,
  helpHandler,
  webAppDataHandler
};
