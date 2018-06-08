'use strict';

import vscode = require('vscode');
import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionItem } from 'vscode';
import hub = require('./discospecsKeywords');
import { FROM_DIRECTIVE_PATTERN } from "../discoExtension";

// IntelliSense
export default class DiscoSpecsCompletionItemProvider implements CompletionItemProvider {

    public triggerCharacters: string[] = [];
    public excludeTokens: string[] = [];

    public suggestKeywords(word: string): Promise<vscode.CompletionItem[]> {
        return hub.searchKeywordsInRegistryHub(word, true).then((results) => {
            return results.map((image) => {
                var stars = '';
                if (image.star_count > 0) {
                    stars = ' ' + image.star_count + ' ' + (image.star_count > 1 ? 'stars' : 'star');
                }

                return {
                    label: image.name,
                    kind: vscode.CompletionItemKind.Value,
                    detail: image.is_official + stars,
                    insertText: image.name,
                    documentation: image.description,
                };
            });
        });
    }

    public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Promise<CompletionItem[]> {

        var textLine = document.lineAt(position.line);

        var fromTextDisco = textLine.text.match(FROM_DIRECTIVE_PATTERN);

        if (fromTextDisco) {
            return this.suggestKeywords(fromTextDisco[1]);
        }

        return Promise.resolve([]);
    }
}