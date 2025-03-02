require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// REST API 초기화
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

// 슬래시 명령어 삭제 함수
const deleteCommands = async () => {
    try {
        console.log('슬래시 명령어를 삭제하는 중...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: [] }, // 빈 배열을 보내면 모든 명령어가 삭제됩니다.
        );

        console.log('슬래시 명령어 삭제 완료!');
    } catch (error) {
        console.error(error); // 오류 발생 시 출력
    }
};

// 실행
deleteCommands();
