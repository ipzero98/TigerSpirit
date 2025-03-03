require('dotenv').config(); // 환경 변수를 사용하기 위해 dotenv 패키지 로드
const { REST } = require('@discordjs/rest'); // REST API 사용을 위한 패키지 로드
const { Routes } = require('discord-api-types/v9'); // Discord API의 라우트 정의
const { SlashCommandBuilder } = require('@discordjs/builders'); // 슬래시 명령어 빌더

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

// 명령어 등록 및 삭제를 선택적으로 실행
const action = process.argv[2]; // CLI 인자를 통해 어떤 작업을 할지 선택
if (action === 'register') {
    registerCommands();
} else if (action === 'delete') {
    deleteCommands();
} else {
    console.log('사용법: node 명령어.js register|delete');
}
