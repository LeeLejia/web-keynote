import * as vscode from 'vscode'
import { previewProvider } from './previewProvider'

export function init(context: vscode.ExtensionContext) {
  previewProvider.initialize(context)
  context.globalState.update('previewProvider', previewProvider)
  context.subscriptions.push(
    previewProvider
  )
}