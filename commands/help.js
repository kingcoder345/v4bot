const Discord = require("discord.js");
const config = require("../config.json");

// module.exports.run = async (client, message, args) => {
module.exports.run = (client, message, args) => {

  message.channel.send("Check private messages to see the help message! ");

      let gagi = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Community commands!")
          .addField("hug", 'Hugs the mentioned user!')
          .addField('servers', 'Shows you bots server list')
          .addField('ping', 'shows you the ping of the bot')
          .addField('stats', 'shows you the most information about the bot')
          .addField('serverinfo', 'gives u information about the server')
          .addField('botinfo', 'gives u short version about the bot')
          .addField('coinflip', 'either head or tail')
          .addField("remind", 'reminds you of the dedicated time you put it on')
          .addField('candy', 'gives the mentioned user candy :D') 
          .addField('meme', 'I think it says what it does. well if you dont know it will give you a random meme')
          .addField('pfp',  'shows a users pfp')
          .addField('8ball', 'ask it anything and it will give you a Answer')
          .addField('cuddle', 'cuddles any user')
          .addField('poke', 'pokes a user')
          .addField('tickle', 'tickles a user')
          .addField('smack', 'smacks a user')
          .addField('kiss', 'kiss a user')
          .addField('spank', 'spanks a user Nsfw only channels')
          .addField('advice', 'give life advice')
          .addField('suggest', 'make suggestings for the server and have them vote on it')
          .addField('coinflip', ' flips a coin')
          .addField('status', 'shows a user status')
          .setTimestamp(new Date())
          .setFooter(`requested by ${message.author.tag}`);


          let gagi2 = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle('Moderator Commands!')
          .addField('Kick', 'Kicks the mentioned user!')
          .addField('server', 'shows support server invite and hoster server')
          .addField('Say', 'Use this for announcements :D Only Moderators,Administrator,Owner/Creator use this command')
          .addField('owner', 'shows who made me and a litte message')
          .addField('slowmode', 'sets slowmode for any text channels')
          .addField('kickbot', 'only for bot owner do not use')
          .addField('bug', 'do $bug and put the bug your having')
          .addField('clear', 'clears channels message do $clear a number')
          .addField('lockdown', 'locksdown any channel in the server only works for members')
          .addField('unlockdown', 'takes off the lockdown')
          .addField('timedlockeddown','locksdown any channel in the server for a amount of time')
          .addField('ban', 'bans a user')
          .addField('unban', 'unbans a user')
          .setFooter(`requested by ${message.author.tag}`);


          

message.author.send(gagi);
message.author.send(gagi2);

// module.exports.help = {
//     name: "help"
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'help',
    description: '',
    usage: 'help'
  };
  
};