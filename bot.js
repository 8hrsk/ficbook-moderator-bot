const { Telegraf } = require('telegraf');
const { TOKEN, botData } = require('./config.json');
const commands = require('./api/commands.js');
const reportLogic = require('./api/reportLogic.js');
const { performance } = require('perf_hooks');
const createReport = require('./api/report');

const bot = new Telegraf(TOKEN);

bot.start(ctx => {
    ctx.reply('Hello!')
})

console.log(botData);
console.log(commands);
console.log(reportLogic);
console.log(createReport);

bot.on('message', async ctx => {
    const bot = ctx.botInfo.username
    if (ctx.message.text !== undefined) {

        const message = ctx.message.text;

        if (message[0] == '/') {
// ! read about this kludge in /api/commands.js
            let commandName = message.replace('/', '').replace('@ficbookking_bot', '')
// ! -----------------------------------------
            if (commandName.includes('@')) {
                commandName = 'nocommand'
            }

            try {
                let pingStarted = 0;
                if (commandName == 'ping') {
                    pingStarted = performance.now()
                };

                console.log('calling func');
                commands[commandName](ctx, bot, pingStarted);
                //reportLogic.deleteMess(ctx, null)
            } catch (err) {
                if (commandName == '') {
                    ctx.reply('Нужно ввести тело команды');
                    //reportLogic.deleteMess(ctx, 5000)
                } else {
                    ctx.reply('Извини, но такой комманды не существует 😢');
                    //reportLogic.deleteMess(ctx, 5000)
                }
            }
        }
    }
})

try {
    bot.launch();
    console.log(`Bot is online!`)
} catch (error) {
    console.log(error);
}