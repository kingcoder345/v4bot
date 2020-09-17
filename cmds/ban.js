const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
  if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
    bot.mePermMsg(message)
    return;
  }
  if (!message.member.hasPermission('BAN_MEMBERS')) {
    bot.permMsg(message);
    return;
  }
  if (!message.mentions.members) {
    bot.mentionMsg(message)
    return;
  }
  
  let mem = message.mentions.members.first()
  let reason = args.slice(2).join(' ')
  if(!reason) reason = 'No Reason'
  
  if (!mem.bannable) {
    message.channel.send(mem + " is not bannable!");
    return;
  }
  if(mem.id == message.author.id){
    message.channel.send("Can't ban yourself silly!")
    return
  }
  if (!mem.user.bot) mem.send("You have been banned from *" + message.guild.name + "* (" + message.guild.id + ") :cry:\n\nReason: **" + reason + "**");
  message.channel.send(`Banned ${mem} for: \n\ ${reason}!`);
  mem.ban({reason: reason})
}

module.exports.help = {
  name: "ban"
} 
