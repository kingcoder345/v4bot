
const discord = require('discord.js')
const bot = new discord.Client()
const fs = require("fs")
const db = require("quick.db")

const config = require("./config")
bot.Token = config.Token
bot.prefix = config.prefix


bot.commands = new discord.Collection();

fs.readdir("./cmds/", (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  jsFiles.forEach(f => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
  });
  console.log(`Loaded ${jsFiles.length} Commands.`);
  bot.commandNum = jsFiles.length;
});
/*
bot.user.setActivity("Lets code discord server", {
    type: "WATCHING"
  });
  bot.user.setStatus("Online");
*/

/* ////////////////////////    Anti Link   ////////////////////////////////////////// */
function is_url(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if(regexp.test(str)) {
      return true;
    } else {
      return false;
    }
    
  }


/* ////////////////////////    Mute func   ////////////////////////////////////////// */

const usersMap = new Map();
const LIMIT = 5; //How many messages it takes to mute /ms
const TIME = 10000 //How long they have to send 5 messages to mute /ms
const DIFF = 2500 //if they dont send a message for that much time it resets anyway /ms

const roleid = "755813413074239620" // Put the role id here. This is the id the bot gives when user gets muted


bot.on('message', message => {
    if(message.author.bot) return;
/* Just a quick anti link module 
    if(is_url(message.content) === true) {
        message.delete()
        return message.channel.send("You can not send link here :/")
      }

      // This is optional, if wish to have anti links please delete line 57 and line 64
 End of Just a quick anti link module */

    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id)
        const { lastMessage, timer } = userData
        const diffrence = message.createdTimestamp - lastMessage.createdTimestamp
        let msgCount = userData.msgCount
        if(diffrence > DIFF) {
            clearTimeout(timer)
            console.log('Cleared Timeout')
            userData.msgCount = 1;
            userData.lastMessage = message
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            console.log(`Removed from RESET`)
            }, 5000)
        
            usersMap.set(message.author.id, userData)
        }
        else {
            msgCount++;
        if(parseInt(msgCount) === LIMIT) {
            const role = message.guild.roles.cache.get(roleid);
            message.member.roles.add(role)
            message.reply(`has been muted`)
            message.author.send("This may be a bug please go to muted chat and request a appeal with proper proof.")
            message.author.send("If you are sorry you may also go there to just normally appeal")
        } else{
            userData.msgCount = msgCount
            usersMap.set(message.author.id, userData)
            
         }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log(`Removed from the map`)
        }, TIME)
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: null
        });
    }
})
/* ////////////////////////    End Of Mute Func   ////////////////////////////////////////// */

bot.on("message", async message => {
    if (message.guild) {
      let prefix = config.prefix
      // changed it to await instead of .then
      if (message.author.bot) return;
      if (message.content.startsWith(prefix)) {
        let args = message.content
          .substring(prefix.length)
          .trim()
          .split(/ +/g);
        let cmd = bot.commands.get(args[0].toLowerCase());
        if (cmd) cmd.run(bot, message, args);
      }
    }
})



bot.login(config.Token)
console.log("Bot ready")
