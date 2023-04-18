const vscode = require('vscode');
const { setOpenAiAPIKey } = require('../openai');

module.exports = vscode.commands.registerCommand('gptest.setApiKey', async function () {
  await setOpenAiAPIKey();
});