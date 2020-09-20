const ownerID ='413173364216168449';
const Discord = require("discord.js");
const client = new Discord.Client();


 module.exports.run = async (client, message, args) => {
     if (message.author.id !== ownerID) return message.channel.send("You are not authorized to use this command.");

     var error17 = new Discord.MessageEmbed().setColor("990033")
         .setDescription('**Please enter a valid server ID.**')
         .setColor(0xff0000)

     var error18 = new Discord.MessageEmbed().setColor("990033")
         .setDescription('**You cannot kick the bot from this server!**')
         .setColor(0xff0000)


     if (isNaN(args[0])) return message.channel.send(error17).then(msg => {
         msg.delete(9000)
     });

     //If tried kick bot from a main server (like for emote provider) will return error18
     if (args[0] !== 373950345153609729 || 481663437705838602) return message.channel.send(error18).then(msg => {
         msg.delete(9000)
     });

     client.guilds.get(args[0]).leave();
     message.channel.send(`**Bot was been removed from server id [${args[0]}]**`)
 }

 module.exports.help = {
     name: "kickbot",
     category: "MODERATION"
 }
