import * as monaco from 'monaco-editor';
import { debounce, throttle } from 'lodash';
import './index.scss';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

export type EditorTheme = 'vs' | 'vs-dark' | 'hc-black' | 'hc-light';

const maxEditorWidth = 200;

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
  private _editor: monaco.editor.IStandaloneCodeEditor;
  private _iframe: HTMLIFrameElement;
  private _container: HTMLDivElement;
  private _codeInputDom: HTMLDivElement;

  private _timerW: any;
  private _downInfo = {
    x: 0,
    width: 0,
  };

  constructor(container: HTMLDivElement) {
    // 初始化事件
    this._onDocumentMouseMove = throttle(this._onDocumentMouseMove.bind(this), 60);
    this._onWindowResize = throttle(this._onWindowResize.bind(this), 60);
    this._onDocumentMouseUp = this._onDocumentMouseUp.bind(this);
    this.runCode = debounce(this.runCode.bind(this), 500);

    // 给最外层容器添加基础属性
    this._container = container;
    container.classList.add('code-playground-container');

    // 创建iframe预览容器
    this._iframe = document.createElement('iframe');

    // 创建代码编辑器
    const codeInput = document.createElement('div');
    this._codeInputDom = codeInput;
    codeInput.className = 'code-playground-input';

    // 插入dom
    container.appendChild(codeInput);
    this._ininResizeControl();
    container.appendChild(this._iframe);

    // 初始化编辑器
    this._editor = monaco.editor.create(codeInput, {
      value: '',
      language: 'html',
      tabSize: 2,
      automaticLayout: false,
      theme: 'vs',
      quickSuggestions: true,
      minimap: {
        enabled: true,
      },
      mouseWheelZoom: true,
      showDeprecated: true,
    });

    // 内容更新回调
    // this._editor.onDidChangeModelContent(() => {
    //   this.runCode()
    // })

    // 窗口尺寸变化，重置编辑器尺寸
    window.addEventListener('resize', this._onWindowResize);
  }

  setTheme(theme: EditorTheme) {
    this._editor.updateOptions({
      theme, // vs, vs-dark, hc-black, hc-light
    });
  }

  private _onWindowResize() {
    const width = Math.max(Math.floor(this._container.offsetWidth / 2), maxEditorWidth);

    const height = this._container.offsetHeight;
    this._editor.layout({
      width,
      height,
    });
    this._codeInputDom.style.width = width + 'px';
  }

  /**
   * 创建可拖动改变编辑器宽度的控制器
   */
  private _ininResizeControl() {
    const resizeControl = document.createElement('div');
    resizeControl.className = 'code-playground_resize-control';
    this._container.appendChild(resizeControl);

    // 鼠标按下
    resizeControl.onmousedown = (ev) => {
      this._container.classList.add('on-press');
      this._downInfo.width = this._codeInputDom.offsetWidth;
      this._downInfo.x = ev.clientX;
      // 鼠标抬起
      document.removeEventListener('mouseup', this._onDocumentMouseUp);
      document.addEventListener('mouseup', this._onDocumentMouseUp);

      // 鼠标移动
      document.removeEventListener('mousemove', this._onDocumentMouseMove);
      document.addEventListener('mousemove', this._onDocumentMouseMove);
    };
  }

  private _onDocumentMouseUp() {
    this._container.classList.remove('on-press');
    document.removeEventListener('mouseup', this._onDocumentMouseUp);
    document.removeEventListener('mousemove', this._onDocumentMouseMove);
  }

  /**
   * 更新编辑器尺寸
   */
  private _onDocumentMouseMove(ev: MouseEvent) {
    clearTimeout(this._timerW);
    const changeX = ev.clientX - this._downInfo.x;
    const width = Math.max(this._downInfo.width + changeX, maxEditorWidth);
    this._editor.layout({
      width,
      height: this._codeInputDom.offsetHeight,
    });
    this._codeInputDom.style.width = width + 'px';
  }

  /**
   * 设置代码
   */
  setCode(data: string) {
    this._editor.setValue(data);
    this._editor.setScrollTop(0);
    return this;
  }

  /**
   * 重新运行编辑器中的代码
   */
  runCode() {
    const data = this._editor.getValue();
    // console.log("设置数据", data)
    this._iframe.srcdoc = data;
  }

  dispose() {
    clearTimeout(this._timerW);
    document.removeEventListener('mouseup', this._onDocumentMouseUp);
    document.removeEventListener('mousemove', this._onDocumentMouseMove);
    this._editor.dispose();
  }
}
