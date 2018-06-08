'use strict';

import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionItem, CompletionItemKind } from 'vscode';
import composeVersions from './discospecsKeywords';

// IntelliSense
export default class DiscoSpecsCompletionItemProvider implements CompletionItemProvider {

    public triggerCharacters: string[] = [];
    public excludeTokens: string[] = [];
    // supported version so far
    public version: string = '2000';

    private suggestKeywords(word: string, version: string): CompletionItem[] {
        const keys = composeVersions.v2000 || composeVersions.All;

        return Object.keys(keys).map(ruleName => {
            var completionItem = new CompletionItem(ruleName);
            completionItem.kind = CompletionItemKind.Keyword;
            completionItem.insertText = ruleName + ': ';
            completionItem.documentation = keys[ruleName];
            return completionItem;
        });
    }

    public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Promise<CompletionItem[]> {

        var textLine = document.lineAt(position.line).text;

        if (textLine.length === 0) {
            // empty line
            return Promise.resolve(this.suggestKeywords('', this.version));
        }

        let range = document.getWordRangeAtPosition(position);

        // Get the text where intellisense was invoked on (e.g. 'c').
        let word = range && document.getText(range) || '';

        var textBefore = textLine.substring(0, position.character);
        if (/^\s*[\w_]*$/.test(textBefore)) {
            // on the first token
            return Promise.resolve(this.suggestKeywords(word, this.version));
        }       

        return Promise.resolve([]);
    }
}