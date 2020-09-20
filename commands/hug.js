const Discord = require("discord.js");

module.exports.run = async (client,  message, args) => {
let kUser =  message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!kUser) return message.channel.send("Cant find user!");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Oof it seems like you no has da perms! please try again soon or when you have the perms.");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't kick that person! they are a higher role then you..");

  let kickEmbed = new Discord.MessageEmbed()
   .setDescription("**Kick**")
   .setColor("#e26ce1")
   .addField("Kicked User", `${kUser} With ID: ${kUser.id}`)
   .addField("Reason", kReason)
   .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
   .addField("Kicked in", message.channel)
   .setTimestamp()
   .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL);

   let kickChannel = message.guild.channels.find(`name`, "logs");
   if(!kickChannel) return message.channel.send("Can't find logs channel.");

   message.guild.member(kUser).kick(kReason);
   kickChannel.send(kickEmbed);

}
module.exports.help = {
  name: "kick",
  aliases: [],
  category: "kickOnly"
}
