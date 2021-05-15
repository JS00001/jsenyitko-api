const {client, WebhookClient} = require("./core/config");
const Discord = require("discord.js");
const Config = require("./core/config");
const db = require("./core/models");
const ws = require("./socket");

client.login(Config.botToken);

client.on("ready", async => {
    console.log("Discord bot online");
    console.log(Config.prefix)
})

client.on("message", async msg => {
    if(!msg.content.startsWith(Config.prefix)) return;
    if (msg.channel.type == "dm") return;
    if (msg.guild.id != Config.guild) return;

    let args = msg.content.split(" ").slice(1);
    let command = msg.content.split(" ")[0];
    command = command.slice(Config.prefix.length);

    function successEmbed(message) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Success")
        .setDescription(`:white_check_mark: ${message}`)
        .setColor("98FF6E")
        msg.channel.send(embed);
    }

    function errorEmbed(message) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription(`:x: ${message}`)
        .setColor("FF6E6E")
        msg.channel.send(embed);
    }

    if(command == "tp") {
        let usersDatabase = await db.collection('users');
        usersDatabase.findOne({id: msg.author.id}, async (err, doc) => {
            if(err) return console.log(err)
            if(!doc || doc.ign == "None") return errorEmbed(`You do not have an account registered or your IGN has not been set.\n**Register At: **${Config.url}`);
            if(!args[0]) return errorEmbed(`**Usage: **${Config.prefix}tp <ign to tp to>`);
            await usersDatabase.findOneAndUpdate({id: msg.author.id}, {$push: {events: {status: "Teleport", detail:`You teleported to ${args[0]}`}}});
            successEmbed(`Teleporting **${doc.ign}** to **${args[0]}**`)
            ws.sendClientMessage(`tp ${doc.ign} ${args[0]}`)
        });
    }
})

module.exports.client = client;
module.exports.WebhookClient = WebhookClient;