const ms = require("ms");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let reminderTime = args[0];
    if (!reminderTime) return message.channel.send("**Specify a time for me to remind you. Usage: /remind 15min any text or code**");

    let reminder = args.slice(1).join(" ");
  
    if(!reminder) return message.reply("please specify something for me to remind you of!").then((msg) => msg.delete(10000));

    let remindEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField("Reminder", `\`\`\`${reminder}\`\`\``)
        .addField("Time", `\`\`\`${reminderTime}\`\`\``)
        .setTimestamp();

    message.channel.send(remindEmbed);


    setTimeout(function() {
        let remindEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .addField("Reminder", `\`\`\`${reminder}\`\`\``)
            .setTimestamp()

        message.channel.send(`<@${message.author.id}>`, {embed: remindEmbed});
    }, ms(reminderTime));

}

module.exports.help = {
    name: "remind"
};
