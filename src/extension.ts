import { exec } from "child_process";
import * as path from "path";
import * as vscode from "vscode";

function startWatch(): void {
	function subscribe(): void {
		consoleChannel.appendLine("		+	subscribe");
		const watcher: vscode.FileSystemWatcher = vscode.workspace.createFileSystemWatcher("**/*", false, true, false);
		watcher.onDidCreate(uri => {
			const filePath: string = uri.fsPath;
			consoleChannel.appendLine(`	Create file    ${filePath}`);
			runScript(filePath);
		});
		watcher.onDidDelete(uri => {
			const filePath: string = uri.fsPath;
			consoleChannel.appendLine(`	Delete file    ${filePath}`);
			runScript(filePath);
		});
	}

	function runScript(filePath: string): void {
		const cmd: string = `cd /d "${workspacePath}" & node "${script}" "${filePath}"`;
		if (path.extname(filePath) === ext) {
			consoleChannel.appendLine(`*** run command: ${cmd}`);
			exec(cmd);
		}
	}

	interface IConfig {
		extname: string;
		script: string;
	}

	const consoleChannel: vscode.OutputChannel = vscode.window.createOutputChannel("File Watcher");
	const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("filewtcherconfig");
	const ext: string = config.extname;
	const script: string = config.script;
	const workspaceFolders: vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
	let workspacePath: string | null = null;
	if (workspaceFolders != null) {
		consoleChannel.appendLine("		start File Watcher");
		workspacePath = workspaceFolders[0].uri.fsPath;
		consoleChannel.appendLine(workspacePath);
		subscribe();
	} else {
		consoleChannel.appendLine("		need to open a workspaceFolder");
	}
}

export function activate(context: vscode.ExtensionContext): void {
	startWatch();
}

export function deactivate(): void { }
