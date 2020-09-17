const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
  if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
    bot.myPermMsg(message)
    return;
  }
  if (!message.member.hasPermission('KICK_MEMBERS')) {
    bot.permMsg(message);
    return;
  }
  if (!message.mentions.members) {
    bot.mentionMsg(message)
    return;
  }
                
  message.mentions.members.forEach(mem => {
    if (!mem.kickable) {
      message.channel.send(`${mem} is not kickable!`);
      return;
    }
    if (!mem.user.bot) mem.send(`You have been kicked from ${message.guild.name} ${message.guild.id}.`);
    message.channel.send(`:boot: Kicked ${mem}!`);
    mem.kick();
  });
}
module.exports.help = {
  name: 'kick'
}
