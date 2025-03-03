require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log('봇이 준비되었습니다!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === '안녕') {
        await interaction.reply('안녕하세요! 제가 도와드릴 일이 있나요?');
    } else if (commandName === '정보') {
        await interaction.reply('이 봇은 한글 기반의 디스코드 봇입니다. 다양한 명령어를 사용할 수 있어요!');
    } else if (commandName === '도움') {
        await interaction.reply('사용할 수 있는 명령어: \n/안녕\n/정보\n/도움');
    }
});

// 환경 변수에서 토큰을 가져와서 로그인
client.login(process.env.DISCORD_TOKEN);
