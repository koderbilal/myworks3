// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageUpdate
const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const { green_light } = require("../../colours.json");

module.exports = class MessageUodateEvent extends BaseEvent {
  constructor() {
    super('messageUpdate');
  }
  
  async run(client, oldMessage, newMessage) {
    //look for the channel called mod-logs
    const channel = client.channels.cache.find(channel => channel.name === "mesaj-log");

    //ignore bot messages to avoid weird behaviour
    if(oldMessage.author.bot) return;

    //check if the 2 messages are the same
    if(oldMessage === newMessage) return;

    //if the channel exists
    if(channel){
      //create an embed with the edited message info
     var embed = {
            description:
`
**İsim : ** <@${newMessage.member.user.id}> - *${newMessage.member.user.tag}*
**Tarih : ** ${newMessage.createdAt}
**Kanal : ** <#${newMessage.channel.id}> - *${newMessage.channel.name}*

**Orijinal mesaj : **
\`\`\`
${oldMessage.content.replace(/`/g, "'")}
\`\`\`
**Güncellenen Mesaj : **
\`\`\`
${newMessage.content.replace(/`/g, "'")}
\`\`\`
`,
            color: 16737792,
            timestamp: new Date(),
            footer: {
                text: "Düzenlendi : ",
				client.user.displayAvatarURL()
            },
            author: {
                name: "MESAJ DÜZENLENDİ",
                icon_url: "https://cdn.discordapp.com/emojis/619328813381320735.png"
            }
        }

      channel.send(embed);
    }
  }
}