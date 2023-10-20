const { Spreadsheets } = require('../config.json')
const { GoogleSpreadsheet } = require('google-spreadsheet')

console.log('GoogleSpreadsheet is runnings');
const doc = new GoogleSpreadsheet(Spreadsheets.ID);

module.exports = {
    sendReport: async (text, messageAuthor, author, replyDate) => {
        try {
            await doc.useServiceAccountAuth({
                client_email: Spreadsheets.client_email,
                private_key: Spreadsheets.private_key,
            })
            .then(async () => {
                console.log('Sheets ON');
                await doc.loadInfo()
            })
            .then(async () => {
                const sheet = doc.sheetsByIndex[0]
                console.log(messageAuthor, text, author, replyDate);
                sheet.addRow({
                    username: messageAuthor,
                    message: text,
                    reporter: author,
                    date: replyDate
                })
            })
        } catch (error) {
            console.log(error);
        }
    },

    loadInfo: async () => {
        try {
            await doc.useServiceAccountAuth({
                client_email: Spreadsheets.client_email,
                private_key: Spreadsheets.private_key,
            })
            .then(async () => {
                console.log('Sheets ON');
                await doc.loadInfo()
            })
            .then(async () => {
                const sheet = doc.sheetsByIndex[0]
                console.log(sheet.columnCount - 1)
                // TODO return of string to reply
            })
        } catch (error) {
            console.log(error);
            // TODO return of string to reply if error
        }
    } 
}