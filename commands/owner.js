const Discord = require("discord.js")

exports.run = (client, message, args) => {

  let stats = new Discord.MessageEmbed()
  .setTitle("Bot info ",'bot made by exoitc development#3335')
  .addField('bot made by exoitc development#3335', 'Hello and Welcome to V4 if you need anyhelp just run $server and join the suppurt server are dm me Directly thanks for inviting my bot!')
  message.channel.send(stats)

};


module.exports.help = {
  name: "owner"
}