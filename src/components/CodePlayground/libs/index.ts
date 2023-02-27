import * as monaco from 'monaco-editor';
import { debounce } from 'lodash';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};
monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

export default class CodePlayground {
  _editor: monaco.editor.IStandaloneCodeEditor;
  _iframe: HTMLIFrameElement;

  constructor(container: HTMLDivElement) {
    this._iframe = document.createElement('iframe');
    const codeInput = document.createElement('div');
    codeInput.className = 'code-playground-input';

    container.appendChild(codeInput);
    container.appendChild(this._iframe);
    this._editor = monaco.editor.create(codeInput, {
      value: '',
      language: 'html',
      automaticLayout: false,
      theme: 'vs-dark',
    });

    this.updateHtml = debounce(this.updateHtml.bind(this), 500);

    // 内容更新回调
    // this._editor.onDidChangeModelContent(() => {
    //   this.updateHtml()
    // })
  }

  setCode(data: string) {
    this._editor.setValue(data);
    return this;
  }

  updateHtml() {
    const data = this._editor.getValue();
    // console.log("设置数据", data)
    this._iframe.srcdoc = data;
  }
}
