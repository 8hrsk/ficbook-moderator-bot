const { log } = require('console');
const { botData } = require('../config.json')
const fs = require('fs')
const path = require('path')

console.log("logic connected");

const reportLogic = {
    logic: (ctx) => {
        console.log('logic running');
    },

    addNewReport: async () => {
        console.log('Executing');
        fs.readFile(path.join(__dirname + '/statistics.json'), (err, data) => {
            if (err) throw new Error;
            let reports = JSON.parse(data)
            reports.totalReports += 1;
            reports = JSON.stringify(reports);
            fs.writeFile(path.join(__dirname + '/statistics.json'), reports, () => {
                console.log('Updated!');
            })
        })
    },

    deleteMess: async (ctx, num) => {
        console.log('deleting');
        try {
            const _chatId = ctx.message.chat.id
            const _id = ctx.message.message_id
            if (num == 5000) {
                setTimeout(() => {
                    ctx.deleteMessage(_id + 1)
                }, 5000)
            } else {
                ctx.deleteMessage(_id)

                setTimeout(() => {
                    ctx.deleteMessage(_id + 1)
                }, 20000)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = reportLogic