const Discord = require('discord.js');

const db = require('quick.db');



    module.exports.run = async (bot, message, args) => {
        let mem = message.mentions.members.first()
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('You can\'t use that');


        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Please specify a user, via mention or ID');

        if(user.bot) return message.channel.send('You can\'t warn bots');

        if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself silly willy');

        if(message.guild.owner.id === user.id) return message.channel.send('You can\'t warn the server\'s owner');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);


        if(warnings === 4) mem.kick(3) //How many warnings it takes to get banned or do mem.kick() to kick


        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            await message.channel.send(`**${user.username}** has been warned`)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            await message.channel.send(`**${user.username}** has been warned`)
        }
    }

    module.exports.help = {
        name: "warn"
      } 
