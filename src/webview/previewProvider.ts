import { commands, Disposable, ExtensionContext, ViewColumn, WebviewPanel, window, Uri } from "vscode"
import * as path from 'path'
import * as vscode from 'vscode'
import {getExtensionFileVscodeResource} from '../utils'
import { Doc } from "../model/Doc";
export class PreviewProvider implements Disposable {

    private context: ExtensionContext | undefined
    private panel: WebviewPanel | undefined

    public initialize(context: ExtensionContext): void {
        this.context = context
        this.initWebView()
    }

    // 初始化窗口
    private initWebView() {
        if(!this.context) {
            return
        }
        this.panel = window.createWebviewPanel("WebKeyNote.section.preview", "Section preview", ViewColumn.Two, {
            enableScripts: true,
            enableCommandUris: true,
            enableFindWidget: true,
            retainContextWhenHidden: true,
        })
        this.onDidReceiveMessage(this.context, this.panel)
        this.panel.onDidDispose(() => {
            this.panel = undefined
        }, null, this.context.subscriptions)

        this.panel.webview.html = this.renderHTML()
        this.panel.title = `预览`
        this.panel.iconPath = Uri.file(this.context.asAbsolutePath(path.join('resources', 'section.svg')))
        this.panel.reveal(ViewColumn.Two)
    }

    // 和webview交互 todo
    private onDidReceiveMessage(context: ExtensionContext, panel: WebviewPanel) {
        panel.webview.onDidReceiveMessage(async (message: IWebViewMessage) => {
            switch (message.command) {
                case "xxx":
                    // await commands.executeCommand("xxx", this.section)
                    this.dispose()
                    return
            }
        }, this, context.subscriptions)
    }

    public async preview(data: WebKeyNote.Section | WebKeyNote.Doc): Promise<void> {
        if(!this.panel) {
            this.initWebView()
        }
        if(!this.panel) {
            vscode.window.showInformationMessage('WebView初始化失败😨')
            return
        }
        if(data instanceof Doc) {
            const sectionList = data.getSections()
            if(sectionList.length === 0) {
                vscode.window.showInformationMessage('空文档鸭～😨')
                return
            }
            this.panel.title = data.title || 'KeyNote Doc'
            this.panel.webview.postMessage({text: data.renderHTML()})
        } else {
            this.panel.title = data.title || 'WebKeyNote Page'
            this.panel.webview.postMessage({text: data.renderHTML()})
        }
    }

    public dispose(): void {
        if (this.panel) {
            this.panel.dispose()
        }
    }

    private renderHTML(): string {
        if(!this.context) {
            return ''
        }
        const rootPath = getExtensionFileVscodeResource(this.context, '/')
        const htmlTemplate: string = `
        <link rel="stylesheet" type='text/css' media='all' href="${rootPath}/keynote/static/css/webslides.css">
        <main role="main" style="zoom: 0.6">
            <article id="webslides" class="vertical">
            </article>
        </main>
        <script src="${rootPath}/keynote/static/js/webslides.min.js"></script>
        <script>
        window.addEventListener('message', event => {
            const webslides = document.querySelector('#webslides')
            if(!webslides) {
                return
            }
            webslides.innerHTML = event.data.text || '<div style="font-size: 40px;text-align: center;">文档为空</div>'
            clearTimeout()
            clearInterval()
            window.ws = new WebSlides({
                autoslide: false,
                changeOnClick: false,
                loop: false,
                minWheelDelta: 40,
                navigateOnScroll: true,
                scrollWait: 450,
                slideOffset: 50,
                showIndex: false
            })
        })
        </script>
        `
        return htmlTemplate
    }

}
export interface IWebViewMessage {
    command: string
}

export const previewProvider: PreviewProvider = new PreviewProvider()
