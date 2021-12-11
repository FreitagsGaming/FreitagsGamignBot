const tmi = require("tmi.js")

const options = {
    options: {
        debug: true
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: 'freitagsgamingbot',
        password: 'oauth:fhh5fsrlkw6547emsqr6wvp77w3exe'
    },
    channels: ['freitags_gaming']
}

const client = new tmi.client(options);

client.connect();

client.on('connected', (adress, port) => {
    console.log('Verbindungsaufbau Erfolgreich')
})

client.on('chat', (channel, user, message, self,) => {
    if(message === '!socials' || message === '!Socials' ) {
        client.action('freitags_gaming', 'Folge Benston auch auf: https://twitter.com/Benston_ • https://youtube.com/Benston • https://instagram.com/benstontv • https://www.tiktok.com/@benston_ • https://discord.gg/x9Jn9CA benstonHYPE ❖')
    }
})

client.on('subscription', (channel, username, method, message, userstate) => {
    console.log('subscribtion', {channel, username, method, message, userstate })
    client.say('freitags_gaming', `Danke @{username}, für deinen Sub.`)
})

client.on('resub', (channel, username, method, _months, message, userstate) => {
    console.log('resub', { channel, username, _months, message, userstate, methods })
    let streakmonths = userstate['msg-param-streak-months'];
    let cumulativeMonths = userstate['msg-param-cumulative-months']
    let sharedStreak = userstate['msg-param-should-share-streak']
    if(sharedStreak) {
        client.say('freitags_Gaming', `Danke, dass du auch im ${streakmonths} Monat noch treu bist! @${username}`)
    } else {
        client.say('freitags_gaming', `Danke dass du resubst, warst jetzt insgesamt ${cumulativeMonths} Monate Sub :D @${username}`)
    }
})