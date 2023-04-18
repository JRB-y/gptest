const { Configuration, OpenAIApi } = require('openai');
const vscode = require('vscode');

const setOpenAiAPIKey = async () => {
  const apiKey = await vscode.window.showInputBox({
    prompt: 'Please enter your OpenAI API key',
  });

  await vscode.workspace
    .getConfiguration()
    .update(
      'gptest.apiKey',
      apiKey,
      vscode.ConfigurationTarget.Workspace
    );
}
const initOpenAI = async () => {
  let apiKey = vscode.workspace.getConfiguration().get('gptest.apiKey');
  if (!apiKey) {
    await setOpenAiAPIKey();
  }

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: vscode.workspace.getConfiguration().get('gptest.apiKey'),
    })
  );

  return openai;
}
module.exports = {
  setOpenAiAPIKey,
  initOpenAI,
}