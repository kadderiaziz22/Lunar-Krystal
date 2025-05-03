module.exports.config = {
  name: "spam2",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "Modified by Assistant",
  description: "Spam message with custom delay and count",
  commandCategory: "Spam",
  usages: "spam2 <message> <delay_seconds> <count>",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  
  if (args.length < 3) {
    return api.sendMessage("Usage: spam2 <message> <delay_seconds> <count>", threadID, messageID);
  }

  const count = parseInt(args[args.length - 1]);
  const delay = parseInt(args[args.length - 2]) * 1000; // Convert to milliseconds
  const message = args.slice(0, args.length - 2).join(" ");

  if (isNaN(delay) || isNaN(count) || count <= 0 || delay < 0) {
    return api.sendMessage("Delay and count must be valid numbers", threadID, messageID);
  }

  api.sendMessage(`Starting spam: "${message}" ${count} times with ${delay/1000}s delay`, threadID);

  for (let i = 0; i < count; i++) {
    await new Promise(resolve => setTimeout(resolve, delay));
    await api.sendMessage(message, threadID);
  }
};
