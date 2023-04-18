const GPTestCommand = require('./src/commands/GPTest');
const SetLibraryCommand = require('./src/commands/SETLibrary');
const SETApiKeyCommand = require('./src/commands/SETApiKey');

const activate = async (context) => {
  console.log('GPTest is now active!');

  context.subscriptions.push(GPTestCommand);
  context.subscriptions.push(SetLibraryCommand);
  context.subscriptions.push(SETApiKeyCommand);
}

function deactivate() {
  // TODO: we can remove the API key when extension is deactivate.
}

module.exports = {
  activate,
  deactivate
}
