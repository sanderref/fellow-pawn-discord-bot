require('dotenv').config()

//node modules :
const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('[bot ready]');
});

client.login(process.env.BOT_TOKEN);