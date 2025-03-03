require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

// 슬래시 명령어 정의
const commands = [
    new SlashCommandBuilder()
        .setName('안녕')
        .setDescription('안녕하세요!'),
    new SlashCommandBuilder()
        .setName('정보')
        .setDescription('봇에 대한 정보를 제공합니다.'),
    new SlashCommandBuilder()
        .setName('도움')
        .setDescription('사용 가능한 명령어를 보여줍니다.'),
]
    .map(command => command.toJSON()); // 명령어를 JSON 형식으로 변환

// REST API 초기화
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

// 슬래시 명령어 등록 함수
const registerCommands = async () => {
    try {
        console.log('슬래시 명령어를 등록하는 중...');

        // 명령어 등록
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('슬래시 명령어 등록 완료!');
    } catch (error) {
        console.error(error); // 오류 발생 시 출력
    }
};

// 실행
registerCommands();
