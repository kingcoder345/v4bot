const { MessageEmbed } = require('discord.js'),
        { get } = require('node-superfetch');

const run = module.exports.run = async (client, message, args) => {

    let m = await message.channel.send(`*Please Wait...*`);
    try {
    const { body } = await get('https://meme-api.herokuapp.com/gimme')

    let memeEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(body.title)
    .setImage(body.url)
    .setTimestamp()
    .setFooter(`Request by: ${message.author.tag}`);

    message.channel.send(memeEmbed)
    } catch (e) {
      message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later!`);
    }
  }

  exports.conf = {
      aliases: [],
      cooldown: "5"
  }

  exports.help = {
      name: "meme",
      description: "Get a random meme",
      usage: "meme"
  }
