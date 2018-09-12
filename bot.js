const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const packageinfo = require("./package.json");
const Music = require('discord.js-musicbot-addon');
const {Signale} = require('signale');
const options = {
  disabled: false,
  interactive: false,
  stream: process.stdout,
  types: {
    command: {
      color: 'green',
      label: 'COMMAND'
    },
    info: {
      color: 'grey',
      label: 'INFO',
    },
    error: {
      color: 'red',
      label: 'ERROR',
    },
    owner: {
      color: 'purple',
      label: 'DEVELOPER COMMAND',
    }
  }
};
const signal = new Signale(options);

signal.info("Starting StrafeBot...")
signal.info("Copyright 2018, strafecode.com")
signal.info("Running StrafeBot version " + packageinfo.version +" build " + packageinfo.build)

//----------------------------------------------------------------------------------------------------
//CHANGELOG      //       INFO                                                                       |
//----------------------------------------------------------------------------------------------------
//        12.09.2018 VERISON 0.2 [INTERNAL ONLY]                                                     |
//        BUILD 17                                                                                   |
//----------------------------------------------------------------------------------------------------
//                                                                                                   |
//----------------------------------------------------------------------------------------------------
//  JOIN MY discord                                                                                  |
//  discod.strafecode.com																																						 |
//  strafecode.com/bot																																							 |
//----------------------------------------------------------------------------------------------------
//  COLLABORATORS                 |                                                                  |
// ________________________________                                                                  |
// @CheezBiscut#9461                                                                                 |
// @Seed#0001                                                                                        |
// @UnknownSloth#5107                                                                                |
//----------------------------------------------------------------------------------------------------
//                                                                                                   |
//                                                                                                   |
// LATEST ADDITIONS                                                                                  |
// Simple Help Commands																Added on 12.9.2018														 |
// Reporting System [Simple]                          Added on 12.9.2018                             |
//                                                                                                   |
// LATEST REMOVALS                                                                                   |
//----------------------------------------------------------------------------------------------------

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

	if (command === "bugreport"){
		var details = args.slice(0).join(" ");
		message.reply('Bug Report Submitted to Developers');

		client.channels.get('489303673126780948').sent(':grey_exclamation: ***New Bug Report!*** :grey_exclamation:\n**Reported by: ' + message.author.toString() + '**\nReport Details: \n' + details);
	}
	if (command === "request") {
		var details = args.slice(0).join(" ");
		message.reply('Request has been sent to the Developers!');

		client.channels.get('489303673126780948').send(':grey_exclamation: ***New Request!*** :grey_exclamation:\n**Requested by: ' + message.author.toString() + '**\nReport Details: \n' + details);
	}



	if (command === 'help') {
		message.channel.send('**>>Command List<<**\n-request // Request an idea or a new project \n-bugreport // Report a bug for one of out projects.');
	}





  //OTHER COMMANDS______________________________________________________________
  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  //Moderation commands ___________________________________________________________________________

  //Kick Command
  if(command === "kick") {
    if(!message.member.roles.some(r=>["seedadmin", "seedmod"].includes(r.name)) )
      signal.error("A user executed s!kick without appropriate permissions");
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      signal.error("A user executed s!kick without appropriate member name");
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      signal.error("A user executed s!kick without appropriate bot permissions");
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    if(!reason) reason = "No reason provided";
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  }

  //Ban Command
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      signal.error("A user executed s!ban without appropriate permissions");
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  //OWNER ONLY COMMANDS______________________________________________

  //Show Number of servers and List of Servers
  if (command === 'svrs') {
    if (message.author.id === '230485481773596672'){
      message.author.send("Number of Available Servers: " + client.guilds.size);
      var list = client.guilds.array().sort();
      message.author.send("Available Servers: " + list);
    }
    else{
      message.reply('Unable to perform action - you do not have the appropriate role');
    }
  }

  //Shows Number of accesable channels
  if (command === 'chnls') {
    if (message.author.id === '230485481773596672'){
      message.author.send("Number of Available Channels: " + client.channels.size);
      var list = client.channels.array().sort();
      message.author.send("Available Channels: " + list);
    }
    else{
      message.reply('Unable to perform action - you do not have the appropriate role');
    }
  }

  //Changes the Rich Presence
  if (command === 'rp') {
    var game = args.slice(0).join(" ");

// only @Seed#0001 and @CheezBiscuit can access this command

    //Checking if the sender is a certian user
    if (message.author.id === '230485481773596672' || message.author.id === '317250979311386627') {

      //reset command
      if (game === 'reset') {
        client.user.setActivity('s!help // bot.jyles.pw // Serving ' + client.guilds.size + ' servers');
        message.author.send('Game activity has been reset!')
      }
      else{
        client.user.setActivity(game + ' // bot.jyles.pw // Serving ${client.guilds.size} servers');
        message.author.send('game set to: ' + game);
      }
    }
    else{
      message.reply('you do not have permissions to use this command,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');
    }
  }


});



client.on("ready", () => {
	signal.info(`Bot has started, with ` + client.users.size + ` users, in ` + client.channels.size + ` channels of ` + client.guilds.size + ` guilds.`);
	client.user.setActivity(`-help // strafecode.com // Serving ` + client.guilds.size + ` servers`);
});
client.login(config.token);
