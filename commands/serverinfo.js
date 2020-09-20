const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let sicon = message.guild.iconURL();
  const serverembed = new Discord.MessageEmbed()
    .setDescription("server Information💬")
    .setColor("RANDOM")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Server Owner:", message.guild.owner.user.tag)
    .addField("Creeated On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)
    .addField(
      "Bots",
      `**${
        message.guild.members.cache.filter(member => member.user.bot).size
      }**`
    )
    .setFooter(
      "Command Ran By: " + message.author.username,
      message.author.avatarURL
    );
  return message.channel.send(serverembed);

  const embedStats2 = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setTitle("***°•°•°•°•°•°***")
    .addField("Thanks for using Discord Donuts Moderation 🍩")
    .addField(
      "it was sent into your Dms to reduce spam aka way to long messages ‍💻"
    )
    .setTimestamp()
    .setFooter(
      "Command Ran By: " + message.author.username,
      message.author.avatarURL
    );
  message.channel.send(embedStats2);
};
module.exports.help = {
  name: "serverinfo"
};
