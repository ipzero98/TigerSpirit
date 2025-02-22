require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('등록된 슬래시 명령어를 가져오는 중...');

        const commands = await rest.get(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        );

        console.log('등록된 슬래시 명령어:');
        console.log(commands);
    } catch (error) {
        console.error(error);
    }
})();
