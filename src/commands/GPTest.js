const vscode = require('vscode');
const { initOpenAI } = require('../openai');

let promptStart = `You are the most advanced [[languageId]] QA software AI, write an externa test file for: `;
let promptLib = `Your response should be in [[library]] library`;
const promptEnd = `Your response should include ONLY CODE and VALID [[languageId]] syntaxe!`;

module.exports = vscode.commands.registerCommand('gptest.gptest', async function () {
  const editor = vscode.window.activeTextEditor;
  if (!editor) vscode.window.showErrorMessage('You need an active text editor to use GPTest');
  try {
    const openai = await initOpenAI();

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'GPTest',
      cancellable: false,
    }, async (progress) => {
      progress.report({ message: 'GPTest is writting the tests...' });

      const content = editor.document.getText().replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/\t+/g, '').trim();
      const languageId = editor.document.languageId;

      let prompt = promptStart.replace('[[languageId]]', languageId) + content + '\n';

      const library = vscode.workspace.getConfiguration().get('gptest.lib');
      if (library) {
        prompt += `${promptLib.replace('[[library]]', library)}`;
      }

      prompt += `${promptEnd.replace('[[languageId]]', languageId)}`;
      

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { 'role': 'user', 'content': prompt },
        ],
        temperature: 0.7,
      });

      const doc = await vscode.workspace.openTextDocument({
        content: completion.data.choices[0].message.content,
        language: languageId,
      });

      // Show the new text document in an editor
      await vscode.window.showTextDocument(doc);

      progress.report({ message: 'A ${languageId} test file is generated.' });
    });

    
  } catch (error) {
    console.log(error);
  }
});
