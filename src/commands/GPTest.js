const vscode = require('vscode');
const { initOpenAI } = require('../openai');

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
      const prompt = `Write a test file for the following ${languageId} file, use a popular ${languageId} testing library. ONLY CODE! The file: ${content}`;

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: 'user',
            content: prompt,
          }
        ],
        temperature: 0,
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
