const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { cmd, commands } = require('../command')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();
//fb downloader
cmd({
    pattern: "fb",
    desc: "Download fb videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("Please provide a valid Facebook video URL!");
        const data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`);
        let desc = ` *𝚂𝙷𝙰𝙶𝙴𝙴 𝙼𝙳 𝙵𝙰𝙲𝙴𝙱𝙾𝙾𝙺 𝙳𝙾𝚆𝙽𝙻𝙸𝙳𝚁...⚙️*

*Reply This Message With Option*

*1 𝙳𝙾𝚆𝙽𝙻𝙾𝙳 𝙵𝙱 𝚅𝙸𝙳𝙴𝙾 𝙸𝙽 𝙷𝙳*
*2 𝙳𝙾𝚆𝙽𝙻𝙾𝙳 𝙵𝙱 𝚅𝙸𝙳𝙴𝙾 𝙸𝙽 𝚂𝙳*

> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙳𝙸𝙽𝙴𝚃𝙷 𝚆𝙸𝚂𝙷𝙼𝙸𝚃𝙷𝙰*`;

        const vv = await conn.sendMessage(from, { image: { url: "https://files.catbox.moe/de82e3.jpg"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { video: { url: data.data.hd }, mimetype: "video/mp4", caption: "> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚂𝙷𝙰𝙶𝙴𝙴 𝙼𝙳 *" }, { quoted: mek });
                        break;
                    case '2':               
                    await conn.sendMessage(from, { video: { url: data.data.sd }, mimetype: "video/mp4", caption: "> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚂𝙷𝙰𝙶𝙴𝙴 𝙼𝙳*" }, { quoted: mek });
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
