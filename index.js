require('dotenv').config()

//node modules :
const fs = require('fs');

const Discord = require('discord.js');
const ChessWebAPI = require('chess-web-api');

const chessAPI = new ChessWebAPI();

const client = new Discord.Client();

//#region - functions to be seperated into modules ----------------------------------
//-----------------------------------------------------------------------------------
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

const channelExists = (guild, name) => {
    let channels = guild.channels.cache;
    if (channels.some((e) => {
        if (e.name === name) {
            console.log(`channel ${name} found`);
            return true;
        }
    })) {
        return true;
    }

    console.log(`no channel named ${name} was found`);
    return false;
}

const roleExists = (guild, name) => {
    let roles = guild.roles.cache;
    if (roles.some((e) => {
        if (e.name === name) {
            console.log(`role ${name} found`);
            return true;
        }
    })) {
        return true;
    }

    console.log(`no role named ${name} was found`);
    return false;
}

const giveRole = (roleID, member) => {
    let role = member.guild.roles.cache.find(r => r.name === roleID);
    member.roles.add(role);
    console.log(`${member.user.username} recieved the role ${role.name}`);
}
//#endregion

//#region - discord bot events ------------------------------------------------------
//-----------------------------------------------------------------------------------
const commandFlag = '!';


client.login(process.env.BOT_TOKEN);


client.once('ready', () => {
    console.log('[bot online]...');
    client.user.setActivity('chess to make fewer mistakes');
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

client.on('guildMemberAdd', async (member) => {

    console.log(member.user.username + ' joined the guild');

    let role = member.guild.roles.cache.find(r => r.name === process.env.NEW_MEMBER_ROLE);
    if (!role) return console.log("Role does not exist.");
    member.roles.add(role);

    const channel = member.guild.channels.cache.find(ch => ch.name === process.env.NEW_MEMBER_CHANNEL_NAME);
    if (!channel) return console.log("Channel does not exist.");


    let msg = await channel.send(`welcome ${member.user.username}. Everyone wave!`);
    await msg.react('👋');

    giveRole(process.env.NEW_MEMBER_ROLE, member);
});
//#endregion

//#region - commands ----------------------------------------------------------------
//-----------------------------------------------------------------------------------
handleCommand = async (commandArr, message) => {

    command = commandArr[0].substr(1);
    params = commandArr.slice(1);

    if (command === 'help') {
        fs.readFile('help-list.txt', 'utf8', (err, data) => {
            if (err) throw err;
            let helpList = "\n" + data;
            message.reply(helpList);
        });
        return
    }

    if (command === 'setup') {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            let guild = message.guild;

            if (!channelExists(guild, process.env.NEW_MEMBER_CHANNEL_NAME)) {
                guild.channels.create(process.env.NEW_MEMBER_CHANNEL_NAME, { reason: 'channel did not exist' });
            } else {
                console.log(`the ${process.env.NEW_MEMBER_CHANNEL_NAME} channel existed, and it was therefore not created`);
            }

            if (!roleExists(guild, process.env.NEW_MEMBER_ROLE)) {
                guild.roles.create({
                    data: {
                        name: 'Pawn',
                        color: '#ffffff',
                    },
                    reason: 'role did not exist',
                })
            } else {
                console.log(`the ${process.env.NEW_MEMBER_ROLE} role existed, and it was therefore not created`);
            }


            let guildMembers = guild.members.cache;
            //console.log(guildMembers);

            guildMembers.some((member) => {
                if (member.roles.cache.some((role) => {
                    if (role.name === process.env.NEW_MEMBER_ROLE) {
                        return true;
                    }
                })) {
                    console.log(`user already has that role!`);
                } else {
                    console.log(`role not found on user`);
                    giveRole(process.env.NEW_MEMBER_ROLE, member);
                }
            });

        }
        return
    }

    if (command === 'player') {
        let playerData = await getPlayerData(params[0]);
        let player_name = playerData[0];
        let player_title = playerData[1];
        let rapid_rating = playerData[2];

        await message.reply(
            `${player_title}${player_name} currently has a rating of ${rapid_rating} in rapid`
        );
        return
    }

    //TODO: implement customization
    if (command === 'joke') {
        message.reply('I had dinner once with a Chess Grand Master in a restaurant with checked tablecloths..');
        setTimeout(() => {
            message.reply('It took him two hours to pass me the salt.');
            return
        }, 4000
        );
    }

    if (command === 'test') {
        if (
            channelExists(message.guild, process.env.NEW_MEMBER_CHANNEL_NAME) &&
            roleExists(message.guild, process.env.NEW_MEMBER_ROLE)
        ) {
            console.log('stuff exists');
        }
    }
}
//#endregion