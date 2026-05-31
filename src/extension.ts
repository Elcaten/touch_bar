import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("touchbar.forward", () => {
      vscode.commands.executeCommand("workbench.action.navigateForward");
    }),
    vscode.commands.registerCommand("touchbar.back", () => {
      vscode.commands.executeCommand("workbench.action.navigateBack");
    })
  );
}

export function deactivate(): void {}
