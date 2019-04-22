"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const vscode = require("vscode");
function startWatch() {
    function subscribe() {
        consoleChannel.appendLine("		+	subscribe");
        const watcher = vscode.workspace.createFileSystemWatcher("**/*", false, true, false);
        watcher.onDidCreate(uri => {
            const filePath = uri.fsPath;
            consoleChannel.appendLine(`	Create file    ${filePath}`);
            runScript(filePath);
        });
        watcher.onDidDelete(uri => {
            const filePath = uri.fsPath;
            consoleChannel.appendLine(`	Delete file    ${filePath}`);
            runScript(filePath);
        });
    }
    function runScript(filePath) {
        const cmd = `cd /d ${workspacePath} & node "${SCRIPT}" "${filePath}"`;
        if (path.extname(filePath) === EXT) {
            consoleChannel.appendLine(`*** run command: ${cmd}`);
            child_process_1.exec(cmd);
        }
    }
    const consoleChannel = vscode.window.createOutputChannel("File Watcher");
    const config = vscode.workspace.getConfiguration("filewtcherconfig");
    const EXT = config.extname;
    const SCRIPT = config.script;
    const workspaceFolders = vscode.workspace.workspaceFolders;
    let workspacePath = null;
    if (workspaceFolders != null) {
        consoleChannel.appendLine("		start File Watcher");
        workspacePath = workspaceFolders[0].uri.fsPath;
        consoleChannel.appendLine(workspacePath);
        subscribe();
    }
    else {
        consoleChannel.appendLine("		need to open a workspaceFolder");
    }
}
function activate(context) {
    startWatch();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map