
const {cmd , commands} = require('../command')
const yts = require('yt-search');
const fg = require('api-dylux');

// -------- Song Download --------
cmd({
    pattern: 'song',
    desc: 'download songs',
    react: "🎶",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('*𝐏𝐋𝐄𝐀𝐒𝐄 𝐄𝐍𝐓𝐄𝐑 𝐀 𝐐𝐔𝐄𝐑𝐘 𝐎𝐑 𝐔𝐑𝐋✨*');

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `*🎼 𝐒𝐇𝐀𝐆𝐄𝐄 𝐌𝐃 𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐃𝐄𝐑 . .⚙️*

🎼⚙️ 𝐓𝐈𝐓𝐋𝐄 - ${data.title}



🎼⚙️ 𝐕𝐈𝐄𝐖𝐒 - ${data.views}



🎼⚙️ 𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍 - ${data.description}



🎼⚙️ 𝐓𝐈𝐌𝐄 - ${data.timestamp}



🎼⚙️ 𝐀𝐆𝐎 - ${data.ago}



*Reply This Message With Option*

*1 Audio With Normal Format*
*2 Audio With Document Format*

*_🎧🎭 𝐋𝐊 𝚩𝚯𝚻 𝐆𝚪𝚯𝐔𝚸 🎧🎭_*

> *©*𝙿𝙰𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙳𝙸𝙽𝙴𝚃𝙷 𝚆𝙸𝚂𝙷𝙼𝙸𝚃𝙷𝙰*`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        let down = await fg.yta(url);
                        let downloadUrl = down.dl_url;
                        await conn.sendMessage(from, { audio: { url:downloadUrl }, caption: '> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜ*', mimetype: 'audio/mpeg'},{ quoted: mek });
                        break;
                    case '2':               
                        // Send Document File
                        let downdoc = await fg.yta(url);
                        let downloaddocUrl = downdoc.dl_url;
                        await conn.sendMessage(from, { document: { url:downloaddocUrl }, caption: '> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜ*', mimetype: 'audio/mpeg', fileName:data.title + ".mp3"}, { quoted: mek });
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});


//==================== Video downloader =========================

cmd({
    pattern: 'video',
    desc: 'download videos',
    react: "📽️",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('*Please enter a query or a url !*');

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `*📽️ 𝚂𝙷𝙰𝙶𝙴𝙴 𝙼𝙳 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝙴𝙽𝙻𝙾𝙰𝙳𝙴𝚁 . .⚙️*

📽️⚙️ 𝚃𝙸𝚃𝙻𝙴 - ${data.title}



📽️⚙️ 𝚅𝙸𝚆𝚂 - ${data.views}



📽️⚙️ 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽 - ${data.description}



📽️⚙️ 𝚃𝙸𝙼𝙴 - ${data.timestamp}



📽️⚙️ 𝙰𝙶𝙾- ${data.ago}

_𝐑𝐄𝐏𝐋𝐘 𝐓𝐇𝐈𝐒 𝐌𝐀𝐒𝐒𝐀𝐆𝐄 𝐖𝐈𝐓𝐇 𝐎𝐏𝐓𝐈𝐎𝐍_


*1 Video With Normal Format*
*2 Video With Document Format*


*_🎧🎭 𝐋𝐊 𝚩𝚯𝚻 𝐆𝚪𝚯𝐔𝚸 🎧🎭_*


> *©ᴘᴏᴡᴇʀᴇᴅ 𝙱𝚈 𝙳𝙸𝙽𝙴𝚃𝙷 𝚆𝙸𝚂𝙷𝙼𝙸𝚃𝙷𝙰`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        let downvid = await fg.ytv(url);
                        let downloadvUrl = downvid.dl_url;
                        await conn.sendMessage(from, { video : { url:downloadvUrl }, caption: '> *©𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐇𝐀𝐆𝐄𝐄 𝐌𝐃*', mimetype: 'video/mp4'},{ quoted: mek });
                        break;
                    case '2':
                        let downviddoc = await fg.ytv(url);
                        let downloadvdocUrl = downviddoc.dl_url;
                        await conn.sendMessage(from, { document: { url:downloadvdocUrl }, caption: '> *©𝐒𝐇𝐀𝐆𝐄𝐄 𝐌𝐃 𝐕 1.0.0*', mimetype: 'video/mp4', fileName:data.title + ".mp4" }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
 
