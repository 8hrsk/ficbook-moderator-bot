const { botData } = require('../config.json')
const gAPI = require('./spreadsheed')
const reportLogic = require('./reportLogic');
const path = require('path');
const fs = require('fs')
const { performance } = require('perf_hooks');
const createReport = require('./report.js');

console.log(gAPI);

const commands = {
 // ! kludge for command using. When invocing command from bot messages, we have its username as postfix
 // ! and telegraf can do nothing about it. So this (f) is being called when user invoce function with
 // ! other bot postfix
    nocommand: async (ctx) => {
        console.log('Chillin');
    },
// ! -----------------------------------------------------------------------------------------
    rep: async (ctx, bot) => {
        if (ctx.message.reply_to_message) {
            let result = await createReport.report(ctx)
            console.log(result);
        } else {
            ctx.reply('/rep может быть использовано только вместе с ответом на сообщение')
        }
    },

    help: async (ctx) => {
        ctx.replyWithHTML(
            '<b>Привет!</b>\n\n'+
            'Я бот-помощник для модерации чата фикбук!\n'+
            'Вот список моих комманд:\n'+
            '/rep - создать репорт на пользователя, который отсылает запрещенный контент\n'+
            '/stat - узнать кол-во созданных репортов за всё время\n'+
            '/info - узнать информацию о боте\n'+
            '/ping - узнать возможную задержку бота'
        )
    },

    total: async (ctx) => {
        // TODO total value of messages

        ctx.reply('Извини, но эта комманда пока что не работает 😢')
    },

    info: async (ctx) => {
        ctx.replyWithHTML(
            `Бот-помощник для модерации чата Фикбук\n\n`+
            `Владелец: <b>${botData.ownership}</b>\n`+
            `Разработчик/и: <b>${botData.developers}</b>\n`+
            `Версия: <b>${botData.version}\n</b>\n`+
            'В этой версии были добавлены комманды stat и ping, '+ 
            'а также реализовано автоудаление сообщений бота через' + 
            ' 20 секунд и удаление сообщений-триггеров мгновенно после' +
            ' ответа бота. Сообщения-триггеры не удаляются, если комм'+
            'анда не была выполнена корректно, а сообщения бота в таком '+
            "случае удаляются через 5 секунд"
        )
    },

    stat: async (ctx) => {
        let count = 0
        fs.readFile(path.join(__dirname + '/statistics.json'), (err, data) => {
            if (err) throw new Error;
            let Reports = JSON.parse(data)
            Reports = Reports.totalReports
            count = Number(Reports)
            ctx.reply(`Текущее кол-во созданных репортов: ${count}`)
        })
    },

    ping: async (ctx, not_needed, pingStarted) => {
        let check = await gAPI.loadInfo()
        .then(data => {
            let pingEnded = Math.floor(performance.now() - pingStarted)
            console.log(pingEnded, 'pingEnded!');
            ctx.reply(`Текущая задержка может составлять до ${pingEnded}мс`);
        })
    },

    // warn: async (ctx) => {

    // },

    // ban: async (ctx) => {

    // }
}

module.exports = commands