        if (ctx.message.reply_to_message) {
            let messageAuthor = ctx.message.from.username
            let repliedAuthor = ctx.message.reply_to_message.from.username
            let senderChatUsername = ''
// ! telegraf cant understand that we're sending personal message so we use another kludge
            try {
                senderChatUsername = ctx.message.reply_to_message.sender_chat.username
                repliedAuthor = senderChatUsername
            } catch (error) {
// ! we just ignore this error if message with /rep was sent in personal chat
            }

            let replyDate = new Date().toDateString();
    
            if ((repliedAuthor == 'Channel_Bot' && repliedAuthor == (senderChatUsername == botData.mainChat)) || repliedAuthor == bot) {
                ctx.reply(`/rep нельзя использовать на главный канал, чат или бота`)
            } else {
                if (messageAuthor == botData.mainChat) {
                    messageAuthor = 'администрацией'
                } else {
                    if (messageAuthor == 'Channel_Bot') {
                        messageAuthor = 'каналом'
                    } else {
                        messageAuthor = '@' + messageAuthor
                    }
                }

                if ('@' + repliedAuthor == messageAuthor) {
                    ctx.reply(`Нелья создать репорт на самого себя!`)
                } else {
                    const text = ctx.message.reply_to_message.text
                    gAPI.sendReport(text, repliedAuthor, messageAuthor, replyDate)
                    ctx.reply(`на пользователя @${repliedAuthor} был создан репорт ${messageAuthor}`) // * DONE HERE
                    reportLogic.addNewReport()
                    console.log('New report created!');
                    // TODO can't tag users without tag. Need to add validation

                }
            }
        } else {
            ctx.reply('/rep может быть использовано только вместе с ответом на сообщение')
        }