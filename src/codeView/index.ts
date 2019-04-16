import * as vscode from 'vscode'

import { codeLensProvider } from "./codeLensProvider"

export function init(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider({ scheme: 'file', language: 'klang' }, codeLensProvider)
  )
}