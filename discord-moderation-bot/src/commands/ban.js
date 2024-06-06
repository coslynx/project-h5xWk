const { Client, Message, Permissions } = require('discord.js');

module.exports = {
    data: {
        name: 'ban',
        description: 'Ban a user from the server',
        options: [
            {
                name: 'user',
                type: 'USER',
                description: 'The user to ban',
                required: true,
            },
            {
                name: 'reason',
                type: 'STRING',
                description: 'Reason for banning the user',
                required: false,
            },
        ],
    },
    permissions: [Permissions.FLAGS.BAN_MEMBERS],
    async execute(client, message, args) {
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {
                try {
                    await member.ban({ reason: reason });
                    message.reply(`Successfully banned ${user.tag}`);
                } catch (error) {
                    console.error(error);
                    message.reply('An error occurred while trying to ban the user');
                }
            } else {
                message.reply('That user is not in the server');
            }
        } else {
            message.reply('You need to mention a user to ban');
        }
    },
};