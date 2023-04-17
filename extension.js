const GPTestCommand = require('./src/GPTest');

const activate = async (context) => {
	console.log('GPTest is now active!');
  context.subscriptions.push(GPTestCommand);
}

function deactivate() {
  // TODO: we can remove the API key when extension is deactivate.
}

module.exports = {
	activate,
	deactivate
}
