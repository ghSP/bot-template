const { Client, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client();
client.commands = new Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const f = require(`./commmands/${file}`);
    client.commands.set(f.name, f);
  });
});

client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (message.author.bot) return;

  const prefix = '%';

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.trim().slice(prefix.length).split(/\s+/g);
  const command = args.shift();

  const cmd = client.commmands.get(command);
  if (!cmd) return;

  cmd.run(client, message, args);
});

client.login(config.token);