const Discord = require("discord.js");

   module.exports.run = async (client, message, args) => {
     let bicon = client.user.displayAvatarURL;
     let string = '';
     client.guilds.cache.forEach(guild => {
     string += guild.name + '\n';})
      let bt = client.user.username;
      let botembed = new Discord.MessageEmbed()         
      .setColor("#000FF")
      .addField("Servers In", string)       
      .setTimestamp()
      .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL);
      message.author.send(botembed);
      message.channel.send("Check your Dm's!")
  

 module.exports.help = {
     name: "server"
 }
   }