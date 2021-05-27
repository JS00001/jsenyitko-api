const WebSocket = require("ws");
const db = require("./core/models");
const Discord = require("discord.js");
const ws = new WebSocket.Server({port: 8080});
const { WebhookClient } = require("./core/config");

ws.on("listening", () => {
    console.log("Web Socket is now listening for requests.");
})

ws.on("connection", (socket, req) => {
    socket.on("message", async msg => {
        let msgObject = JSON.parse(msg);
        let embed = new Discord.MessageEmbed();
        let usersDatabase = await db.collection('users');
        let { player, type } = msgObject;

        switch(type) {
            case "death": {
                await usersDatabase
                .findOneAndUpdate({ign: player}, 
                {$push: {events: {status: "Death", detail:`Coords: ${msgObject.coords}`}}});
                break;
            }
            case "ping": {
                await usersDatabase
                .findOneAndUpdate({ign: player},
                {$push: {events: {status: "Ping", detail: `${msgObject.coords}`}}});
                console.log("a")
                embed.setColor("#A16EFF");
                embed.setDescription(`${msgObject.coords}`);
                WebhookClient.send({username: "Location Pinged", embeds: [embed]});
                break;
            }
            case "tp": {
                await usersDatabase
                .findOneAndUpdate({ign: player}, 
                {$push: {events: {status: "Teleport", detail: `You teleported to ${msgObject.target}`}}});
                break;
            }
            case "join": {
                embed.setColor("98FF6E");
                embed.setDescription(`${player} joined the game.`)
                WebhookClient.send({username: "Player Joined", embeds: [embed]});
                break;
            }
            case "leave": {
                embed.setColor("FF6E6E");
                embed.setDescription(`${player} left the game.`)
                WebhookClient.send({username: "Player Left", embeds: [embed]});
                break;
            }
        }
    })
})

function sendClientMessage(args) {
    ws.clients.forEach(client => {
        if(client.readyState !== WebSocket.OPEN) return;
        client.send(args);
    });
}

module.exports = {sendClientMessage};