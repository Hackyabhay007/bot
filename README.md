# HodlSwap Telegram Bot

A Telegram bot for the HodlSwap platform that enables users to access the web app and earn tokens.

## Features

- 🎮 Interactive web app integration
- 👥 Referral system support
- 📊 User tracking and analytics
- 💬 Command handlers for /start and /help
- 🔄 Auto-restart with nodemon in development

## Prerequisites

- Node.js v18 or higher
- A Telegram Bot Token from [@BotFather](https://t.me/BotFather)
- npm or yarn package manager

## Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```bash
cp .env.example .env
```

4. Edit the `.env` file and add your credentials:
```env
BOT_TOKEN=your_telegram_bot_token_here
WEB_APP_URL=https://hodlswap.web.app
```

## Usage

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Project Structure

```
hodlswapfoxbot/
├── index.js          # Entry point - loads environment variables
├── bot.js            # Bot initialization and configuration
├── handlers.js       # Command and event handlers
├── package.json      # Dependencies and scripts
├── .env              # Environment variables (create this!)
├── .env.example      # Example environment file
└── README.md         # This file
```

## Available Commands

- `/start` - Start the bot and access HodlSwap platform
- `/help` - Display help information

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BOT_TOKEN` | Your Telegram bot token from BotFather | Yes |
| `WEB_APP_URL` | URL of the HodlSwap web application | Yes |

## Scripts

- `npm start` - Run the bot in production mode
- `npm run dev` - Run the bot in development mode with nodemon
- `npm test` - Run tests (not implemented yet)

## Troubleshooting

### Bot not starting

1. Make sure you created a `.env` file with valid credentials
2. Check that your bot token is correct
3. Verify Node.js version: `node --version` (should be v18+)
4. Try reinstalling dependencies: `rm -rf node_modules package-lock.json && npm install`

### Module errors

If you see "Cannot use import statement outside a module", make sure all files use CommonJS syntax (`require` instead of `import`).

### Port conflicts

This bot doesn't use HTTP ports, but if you're running multiple bots, make sure they have different bot tokens.

## License

ISC

## Support

For issues and questions:
- Join our Telegram channel: [@hodlswap](https://t.me/hodlswap)
- Open an issue in this repository

