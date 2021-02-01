const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const config = require("./config.json");
const keep_alive = require('./keep_alive.js');


const { Client } = require('discord.js');
const { registerEvents } = require('./utils/registry');


(async () => {
  client.events = new Map();
  client.queue = new Map();
  await registerEvents(client, '../events');
})();



client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});




client.login("token");