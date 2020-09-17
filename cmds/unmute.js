module.exports.run = async (bot, message, args) => {
    const muteid = "755813413074239620" //Mute role id here
    let mem = message.mentions.members.first()

    mem.roles.remove(muteid)
    message.channel.send(`Unmuted ${mem}`)
  }
  module.exports.help = {
    name: 'unmute'
  }
  
