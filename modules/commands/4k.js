module.exports.config = {
  name: "cnameboxs",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Assistant",
  description: "Change names of multiple groups at once",
  commandCategory: "Admin",
  usages: "[name]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Threads }) {
  const threadList = await api.getThreadList(100, null, ["INBOX"]);
  const botID = api.getCurrentUserID();
  
  if (args.length === 0) {
    return api.sendMessage("Please provide a name to set for the groups", event.threadID);
  }

  const newName = args.join(" ");
  let success = 0;
  let failed = 0;

  api.sendMessage(`Starting to change names for all groups to: ${newName}`, event.threadID);

  for (const thread of threadList) {
    if (thread.isGroup) {
      try {
        await api.setTitle(newName, thread.threadID);
        success++;
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay to avoid rate limiting
      } catch (e) {
        failed++;
      }
    }
  }

  return api.sendMessage(
    `✅ Changed names successfully for ${success} groups\n❌ Failed for ${failed} groups`,
    event.threadID
  );
};
