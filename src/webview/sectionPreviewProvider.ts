import { commands, Disposable, ExtensionContext, ViewColumn, WebviewPanel, window, Uri } from "vscode"
import * as path from 'path'
export class SectionPreviewProvider implements Disposable {

    private context: ExtensionContext | undefined
    private section: WebKeyNote.Section | undefined
    private panel: WebviewPanel | undefined

    public initialize(context: ExtensionContext): void {
        this.context = context
    }

    public async preview(section: WebKeyNote.Section): Promise<void> {
        if(!this.context) {
            window.showInformationMessage('SectionPreviewProvider尚未注册!')
            return
        }
        this.section = section
        if (!this.panel) {
            this.panel = window.createWebviewPanel("WebKeyNote.section.preview", "Section preview", ViewColumn.Active, {
                enableScripts: true,
                enableCommandUris: true,
                enableFindWidget: true,
                retainContextWhenHidden: true,
            })
            // 和webview交互
            // todo 交互细节
            this.panel.webview.onDidReceiveMessage(async (message: IWebViewMessage) => {
                switch (message.command) {
                    case "xxx":
                        await commands.executeCommand("xxx", this.section)
                        this.dispose()
                        return
                }
            }, this, this.context.subscriptions)

            this.panel.onDidDispose(() => {
                this.panel = undefined
            }, null, this.context.subscriptions)
        }

        this.panel.webview.html = await this.provideHtmlContent(section)
        this.panel.title = `${section.title}`
        this.panel.iconPath = Uri.file(this.context.asAbsolutePath(path.join('resources', 'section.svg')))
        this.panel.reveal()
    }

    public dispose(): void {
        if (this.panel) {
            this.panel.dispose()
        }
    }

    public async provideHtmlContent(section: WebKeyNote.Section): Promise<string> {
        return await this.renderHTML(section)
    }

    private async renderHTML(section: WebKeyNote.Section): Promise<string> {
        const htmlTemplate: string = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Preview Problem</title>
            </head>
            <style>
                #solve {
                    position: fixed
                    bottom: 1rem
                    right: 1rem
                    border: 0
                    margin: 1rem 0
                    padding: 0.2rem 1rem
                    color: white
                    background-color: var(--vscode-button-background)
                }
                #solve:hover {
                    background-color: var(--vscode-button-hoverBackground)
                }
                #solve:active {
                    border: 0
                }
            </style>
            <body>
                <div >
                    ${section.text}
                </div>
                <button id="solve">Code Now</button>
                <script>
                    (function() {
                        const vscode = acquireVsCodeApi()
                        let button = document.getElementById('solve')
                        button.onclick = solveHandler
                        function solveHandler() {
                            vscode.postMessage({
                                command: 'xxxx',
                            })
                        }
                    }())
                </script>
            </body>
        </html>
        `
        return htmlTemplate
    }

}
export interface IWebViewMessage {
    command: string
}

export const sectionPreviewProvider: SectionPreviewProvider = new SectionPreviewProvider()
