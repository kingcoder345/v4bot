const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Sorry, you don't have permissions to use this!");

    const sayMessage = args.join(" ");

    let servIcon = message.guild.iconURL;
    let esayEmbed = new Discord.MessageEmbed()
    .setTitle("Announcement")
    .setColor("RANDOM")
    .setThumbnail(servIcon)
    .setDescription(`Said by ${message.author}`)
    .addField("Message", `${sayMessage}`)
    .setTimestamp();

    const esayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{});
    // And we get the bot to say the thing:

    message.channel.send(esayEmbed);
}

module.exports.help = {
  name: "say"
}
