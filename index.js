const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const bot = new Discord.Client();

function FlipCoin()
{
    return Math.floor(Math.random() * 100) % 2;
}

bot.on('ready', () => {
    console.log('PhillipBot is online!');
});

bot.on('message', msg=>{
    if (!msg.content.startsWith(prefix) || msg.author.bot)
        return;
    
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == 'flip')
    {
        if (FlipCoin() == 0)
            return msg.channel.send('HEADS');
        else
            return msg.channel.send('TAILS');
    }

    if (command == 'number')
    {
        if (args.length != 2)
            return msg.reply('Usage: !number <first> <last>');

        for (i = 0; i < args.length; i++)
        {
            const amount = parseInt(args[i]);
            if (isNaN(amount))
                return msg.reply('Enter 2 valid numbers you bozo');
            if (amount > 1000000)
                return msg.reply('Chill dawg. Stick to some smaller numbers');
        }

        const num1 = parseInt(args[0]);
        const num2 = parseInt(args[1]);
        const diff = num2 - num1;

        if (diff < 1)
            return msg.reply('The first number has to be less than the last...');

        randomnum = Math.floor(Math.random() * (diff + 1)) + num1;
        return msg.channel.send(randomnum);
    }

    if (command == 'battle')
    {
        if (args.length != 2)
            return msg.reply('Usage: !battle <@user> <your prediction (heads/tails)>');
        if (!msg.mentions.users.size)
            return msg.reply('You have to tag a user in order to battle them');
        if (args[1] != 'heads' && args[1] != 'tails')
            return msg.reply('The second argument must be your prediction, either "heads" or "tails"');

        const taggedUser = msg.mentions.users.first();
        const userGuess = args[1];
        
        var timeleft = 3;
        var downloadTimer = setInterval(function(){
            msg.channel.send(timeleft + '...');
            timeleft -= 1;  
            if(timeleft <= 0){
                clearInterval(downloadTimer);

                if (FlipCoin() == 0)
                    flipResult = 'heads';
                else
                    flipResult = 'tails';
    
                if (userGuess == flipResult)
                    return msg.channel.send(`Winner: <@${msg.author.id}>, Coin: ${flipResult.toUpperCase()}`);
                else
                    return msg.channel.send(`Winner: <@${taggedUser.id}>, Coin: ${flipResult.toUpperCase()}`);
            }
        }, 1000);
    }

    if (command == 'beans')
        return msg.channel.send('milk first');

    if (command == 'collin')
        return msg.channel.send('Hey guys so I apologize for seeming like a recluse recently, but I’m thinking of taking a mental health break from all social media platforms and my phone! I feel like technology has brought us apart from actively connecting with others. Especially because COVID-19 is going on and progressively spreading, being on my phone and dispersing germs doesn’t help counteract the virus. As for my aforementioned assertion, my proclivity to go on Twitter, Snapchat, Instagram, and instant messages has prohibited me from spending adequate time being productive and growing as my own person. Observing nature these past couple days has put everything in a completely different perspective. Therefore, I will not be in contact with anyone indefinitely. I do love and care about all of you and appreciate the concern you all have expressed for me this past fortnite, but I am fine and it’s time to open a new chapter on this journey we call life. Take care y’all. Cheers.');


});

bot.login(token);