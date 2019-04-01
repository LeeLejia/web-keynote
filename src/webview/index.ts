import * as vscode from 'vscode'
import { sectionPreviewProvider } from './sectionPreviewProvider'

export function init(context: vscode.ExtensionContext) {
  sectionPreviewProvider.initialize(context)
  context.globalState.update('sectionPreviewProvider', sectionPreviewProvider)
  context.subscriptions.push(
    sectionPreviewProvider
  )
}