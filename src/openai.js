const { Configuration, OpenAIApi } = require('openai');
const vscode = require('vscode');

module.exports = async () => {
  let apiKey = vscode.workspace.getConfiguration().get('gptest.apiKey');

  if (!apiKey) {
    apiKey = await vscode.window.showInputBox({
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

  console.log('apiKey found in config', apiKey);
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: vscode.workspace.getConfiguration().get('gptest.apiKey'),
    })
  );

  return openai;
}
