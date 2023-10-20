const gAPI = require('./spreadsheed')

console.log('setReport function is ON');

const createReport = {
    report: async (ctx) => {
        console.log('report calles');
        let reportedUsername = ctx.message.reply_to_message.from.username
        let reportedId = ctx.message.reply_to_message.from.id
        let senderChat
        
        try {
            senderChat = ctx.message.sender_chat.username
        } catch (error) {
            senderChat = false
        }

        let author = ctx.message.from.username
        console.log(ctx.message);
        let result = {
            'author': author,
            'message': message,
            'chat': ChatId,
            'reportedId': reportedId,
            'isBot': false,
        }
        if (senderChat) {
            reportedId = ctx.message.sender_chat.id;
            console.log(reportedId);
            ctx.reply(`Hi, ${'@' + senderChat}`)
        } else {
            ctx.reply(`Hi, ${'@' + author}`)
        }
    }
}

module.exports = createReport

// {
//     message_id: 1393,
//     from: {
//       id: 136817688,
//       is_bot: true,
//       first_name: 'Channel',
//       username: 'Channel_Bot'
//     },
//     sender_chat: {
//       id: -1001823937267,
//       title: 'sdf',
//       username: 'ehrskbot',
//       type: 'channel'
//     },
//     chat: { id: -1001861540556, title: 'botGOVNOED', type: 'supergroup' },
//     date: 1686894434,
//     message_thread_id: 1390,
//     reply_to_message: {
//       message_id: 1390,
//       from: {
//         id: 6180307522,
//         is_bot: true,
//         first_name: 'FBKing',
//         username: 'ficbookking_bot'
//       },
//       chat: { id: -1001861540556, title: 'botGOVNOED', type: 'supergroup' },
//       date: 1686894371,
//       text: 'Hi'
//     },
//     text: '/rep',
//     entities: [ { offset: 0, length: 4, type: 'bot_command' } ]
//   }
//   {
//     id: 136817688,
//     is_bot: true,
//     first_name: 'Channel',
//     username: 'Channel_Bot'
//   }
//   {
//     id: -1001823937267,
//     title: 'sdf',
//     username: 'ehrskbot',
//     type: 'channel'
//   }
//   {
//     message_id: 1390,
//     from: {
//       id: 6180307522,
//       is_bot: true,
//       first_name: 'FBKing',
//       username: 'ficbookking_bot'
//     },
//     chat: { id: -1001861540556, title: 'botGOVNOED', type: 'supergroup' },
//     date: 1686894371,
//     text: 'Hi'
//   }