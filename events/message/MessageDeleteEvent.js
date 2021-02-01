// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageDelete
const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const { blue_dark } = require("../../../colours.json");

module.exports = class MessageDeleteEvent extends BaseEvent {
  constructor() {
    super('messageDelete');
  }
  
  async run(client, message) {
    //check if the message is a partial
    if(!message.partial) {
      const channel = client.channels.cache.find(channel => channel.name === "mesaj-log"); //attempt to find the channel called mod-logs

      //ignore the message if it was deleted by a bot, to avoid weird behaviour
      if(message.author.bot) return;
      
      //if the channel exists
      if(channel){
        //find the user that deleted the message from the audit logs
        const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
        let user = "";

        if(entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)){
          user = entry.executor.username + '#' + entry.executor.discriminator;
        } else{ 
          user = message.author.username + '#' + message.author.discriminator;
        }

        //create an embed with the deleted message info
        var embed = {
            description: `
**İsim : ** <@${message.author.id}> - *${message.author.tag}*
**Tarih : ** ${message.createdAt}
**Kanal : ** <#${message.channel.id}> - *${message.channel.name}*

**Silinmiş Mesaj : **
\`\`\`
${message.content.replace(/`/g, "'")}
\`\`\`

**Ek URL : **
${message.attachments.map(x => x.proxyURL)}

`,
            image: {
                url: message.attachments.map(x => x.proxyURL)[0]
            },
            color: 16711680,
            timestamp: new Date(),
            footer: {
                text: `
            Silinen: `,
			client.user.displayAvatarURL()
            },
            author: {
                name: `
            Silinmiş Mesaj `,
                icon_url: "https://cdn.discordapp.com/emojis/619328827872641024.png"
            }
        }

        channel.send(embed);
      }
    }
  }
}