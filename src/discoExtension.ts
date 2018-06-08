'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as path from 'path';
import { DocumentSelector, LanguageClient, LanguageClientOptions, ServerOptions, TransportKind, Middleware, ConfigurationParams, DidChangeConfigurationNotification } from 'vscode-languageclient';
import DiscoSpecsCompletionItemProvider from './disco-specs/discospecsCompletionItemProvider';

export const FROM_DIRECTIVE_PATTERN = /^\s*FROM\s*([\w-\/:]*)(\s*AS\s*[a-z][a-z0-9-_\\.]*)?$/i;

export type KeyInfo = { [keyName: string]: string; };

export interface ComposeVersionKeys {
    All: KeyInfo;
    v2000: KeyInfo;
}

let client: LanguageClient;

const DOCUMENT_SELECTOR: DocumentSelector = [
    { language: 'disco-specs', scheme: 'file' }
];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext): Promise<void> {
    
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(DOCUMENT_SELECTOR, new DiscoSpecsCompletionItemProvider(), '.'));
    // extension active
    console.log('Congratulations, your extension "disco-specs" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the ncommand with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('disco.compileSpecs', () => {
        // The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        let selection = editor.selection;
        let text = editor.document.getText(selection);
        // Display a message box to the user
        vscode.window.showInformationMessage('Selected characters: ' + text.length);
    });
    // register the command compileSpecs
    context.subscriptions.push(disposable);

    // register keyword completion
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(DOCUMENT_SELECTOR, new DiscoSpecsCompletionItemProvider(), '.'));
    
    //activate client
    activateLanguageClient(context);
}

// this method is called when your extension is deactivated
export function deactivate() {
    if (!client) {
        return undefined;
    }
    // perform cleanup
    Configuration.dispose();
    return client.stop();
}

namespace Configuration {

    let configurationListener: vscode.Disposable;

    export function computeConfiguration(params: ConfigurationParams): vscode.WorkspaceConfiguration[] {
        if (!params.items) {
            return [];
        }
        let result: vscode.WorkspaceConfiguration[] = [];
        for (let item of params.items) {
            let config = null;

            if (item.scopeUri) {
                config = vscode.workspace.getConfiguration(item.section, client.protocol2CodeConverter.asUri(item.scopeUri));
            } else {
                config = vscode.workspace.getConfiguration(item.section);
            }
            result.push(config);
        }
        return result;
    }

    export function initialize() {
        configurationListener = vscode.workspace.onDidChangeConfiguration(() => {
            // notify the language server that settings have change
            client.sendNotification(DidChangeConfigurationNotification.type, { settings: null });
        });
    }

    export function dispose() {
        if (configurationListener) {
            // remove this listener when disposed
            configurationListener.dispose();
        }
    }
}

function activateLanguageClient(ctx: vscode.ExtensionContext) {
    let serverModule = ctx.asAbsolutePath(path.join("node_modules", "discospecs-language-server-nodejs", "lib", "server.js"));
    let debugOptions = { execArgv: ["--nolazy", "--debug=6009"] };
    
    let serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc, args: ["--node-ipc"] },
        debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
    };

    let middleware: Middleware = {
        workspace: {
            configuration: Configuration.computeConfiguration
        }
    };

    let clientOptions: LanguageClientOptions = {
        documentSelector: DOCUMENT_SELECTOR,
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
        },
        middleware: middleware as Middleware
    };

    client = new LanguageClient("discospecs-langserver", "Disco-specifications Language Server", serverOptions, clientOptions);
    client.onReady().then(() => {
        // attach the VS Code settings listener
        Configuration.initialize();
    });
    client.start();
}