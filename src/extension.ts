import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
  const wrap = (id: string, target: string): vscode.Disposable =>
    vscode.commands.registerCommand(id, () =>
      vscode.commands.executeCommand(target)
    );

  context.subscriptions.push(
    wrap("touchbar.editor.action.revealDefinition",                  "editor.action.revealDefinition"),
    wrap("touchbar.editor.action.goToReferences",                    "editor.action.goToReferences"),
    wrap("touchbar.workbench.action.terminal.toggleTerminal",        "workbench.action.terminal.toggleTerminal"),
    wrap("touchbar.workbench.action.showCommands",                   "workbench.action.showCommands"),
    wrap("touchbar.editor.action.blockComment",                      "editor.action.blockComment"),
    wrap("touchbar.editor.action.rename",                            "editor.action.rename"),
    wrap("touchbar.editor.action.refactor",                          "editor.action.refactor"),
    wrap("touchbar.workbench.action.toggleSidebarVisibility",        "workbench.action.toggleSidebarVisibility"),
    wrap("touchbar.editor.action.copyLinesDownAction",               "editor.action.copyLinesDownAction"),
    wrap("touchbar.workbench.action.terminal.focusNextPane",         "workbench.action.terminal.focusNextPane"),
    wrap("touchbar.workbench.action.splitEditor",                    "workbench.action.splitEditor"),
    wrap("touchbar.editor.action.jumpToBracket",                     "editor.action.jumpToBracket"),
    wrap("touchbar.workbench.action.closePanel",                     "workbench.action.closePanel"),
    wrap("touchbar.workbench.action.toggleMaximizedPanel",           "workbench.action.toggleMaximizedPanel")
  );
}

export function deactivate(): void {}
