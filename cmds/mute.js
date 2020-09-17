module.exports.run = async (bot, message, args) => {
    const muteid = "755813413074239620" //Mute role id he7e
    let mem = message.mentions.members.first()

    mem.roles.add(muteid)
    message.channel.send(`Muted ${mem}`)
  }
  module.exports.help = {
    name: 'mute'
  }
