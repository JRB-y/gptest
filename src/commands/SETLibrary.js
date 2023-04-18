const vscode = require('vscode');

module.exports = vscode.commands.registerCommand('gptest.setLibrary', async function () {
  const lib = await vscode.window.showInputBox({
    prompt: 'Please enter a testing library: ',
  });

  await vscode.workspace.getConfiguration().update(
    'gptest.lib',
    lib,
    vscode.ConfigurationTarget.Workspace
  );

  vscode.window.showInformationMessage(`${lib} is set as default testing library with success!`);
});
