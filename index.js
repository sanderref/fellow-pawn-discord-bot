require('dotenv').config()

//node modules :
const fs = require('fs');

const Discord = require('discord.js');
const ChessWebAPI = require('chess-web-api');

const chessAPI = new ChessWebAPI();

const client = new Discord.Client();



const getPlayerData = async (player) => {

    let player_name;
    let player_title;
    let rapid_rating;

    await chessAPI.getPlayer(player).then((res) => {

        if (res.body.name) {
            player_name = res.body.name;
        } else {
            player_name = 'this player';
        }

        if (res.body.title) {
            player_title = res.body.title + " ";
        } else {
            player_title = "";
        }

    }, (err) => {
        console.error(err);
        return
    })

    await chessAPI.getPlayerStats(player)
        .then((res) => {
            rapid_rating = res.body.chess_rapid.last.rating;
        }, (err) => {
            console.log(err);
            return
        });

    console.log(`${player_title}${player_name} currently has a rating of ${rapid_rating} in rapid`);
    return [player_name, player_title, rapid_rating];

}

//discord bot events
const commandFlag = '!';


client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
    console.log('[bot online]...');
});

client.on('message', async (msg) => {
    if (msg.content[0] === commandFlag) {
        //await msg.reply('thinking...')

        let commandArr = msg.content.split(' ');

        handleCommand(commandArr, msg);
    } else {
        return
    }
});

//commands
handleCommand = async (commandArr, message) => {
    command = commandArr[0].substr(1);
    params = commandArr.slice(1);
    console.log(params[0]);

    if (command === 'player') {
        let playerData = await getPlayerData(params[0]);
        let player_name = playerData[0];
        let player_title = playerData[1];
        let rapid_rating = playerData[2];

        await message.reply(
            `${player_title}${player_name} currently has a rating of ${rapid_rating} in rapid`
        );
    }
}