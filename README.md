# File & Folder Watcher

Extension for Visual Studio Code
Extension for Visual Studio Code

This extension allows configuring commands that get run whenever a file is saved or folder is changed in vscode.

## Features
* Following two events: onSaveDocument and onFolderChange:
    * **onSaveDocument** - allows to track changes to the contents of an existing file
    * **onFolderChange** - allows to track the deletion, addition and modification of files
* **case insensitive** workspace root folder
* Configure multiple commands that run when the event happened
* Regex pattern matching for files that trigger commands running
* Sync and async support

## Configuration
Add "filewatcher" configuration to user or workspace settings.
* "shell" - (optional) shell path to be used with child_process.exec options that runs commands.
* "autoClearConsole" - (optional) clear VSCode output console every time commands run. Defaults to false.
* "commands" - array of commands that will be run whenever a file is saved.
  * "match" - a regex for matching which files to run commands on
  > NOTE Since this is a Regex, and also in a JSON string backslashes have to be double escaped such as when targetting folders. e.g. "match": "some\\\\folder\\\\.*"
  * "cmd" - command to run. Can include parameters that will be replaced at runtime (see Placeholder Tokens section below).
  * "isAsync" (optional) - defaults to false. If true, next command will be run before this one finishes.

## Placeholder Tokens
Commands support placeholders similar to tasks.json.

* ${workspaceRoot}: **case insensitive** workspace root folder
* ${file}: path of saved file
* ${fileBasename}: saved file's basename
* ${fileDirname}: directory name of saved file
* ${fileExtname}: extension (including .) of saved file
* ${fileBasenameNoExt}: saved file's basename without extension

Samples
=========

**File content** change tracking example.
    Configuration in \.vscode\settings.json

    "appulateinc.filewatcher": {
		"commands": [
			{
				"match": "\\.ts*",
				"isAsync": true,
				"cmd": "echo '${file} file content Changed'",
				"event": "onSaveDocument"
			}		
		]
	},

![ screencast ](https://raw.githubusercontent.com/spostolsky/fileWatcher/master/icons/fileChange.gif)

**Folder content** change tracking example.
    Configuration in \.vscode\settings.json

    "appulateinc.filewatcher": {
		"commands": [
			{
				"match": "\\.*",
				"isAsync": true,
				"cmd": "echo '${file} folder content Changed'",
				"event": "onFolderChange"
			}		
		]
	},

![ screencast ](https://raw.githubusercontent.com/spostolsky/fileWatcher/master/icons/folderChange.gif)

