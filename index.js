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
    if(message === '!help' || message === '!Help' || message === '!hilfe' || message === '!Hilfe' ) {
        client.action('freitags_gaming', 'Hi')
    }
})

client.on('subscription', (channel, username, method, message, userstate) => {
    console.log('subscribtion', {channel, username, method, message, userstate })
    client.say('freitags_gaming', `Danke @{username}, für deinen Sub.`)
})

client.on('resub', (channel, username, method, _months, message, userstate) => {
    console.log('resub', {channel, username, method, _months, message, userstate})
    let streakmonths = userstate['msg-parm-streak-months'];
    let cumulativeMonths = userstate['msg-parm-cumulivative-months']
    let sharedStreak = userstate['msg-parm-should-share-streak']
    if(sharedStreak) {
        client.say('freitags_Gaming', `Danke, dass du auch im ${streakmonths} Monat noch treu bist! ${@username}`)
    } else {
        client.say('freitags_gaming', `Danke das du mich schon seit insgesamt ${cumulativeMonths} Subscriber bist ${username} .`)
    }
})