declare namespace RequestHttp {
  /**
   * 服务器代理别名，方后期便统一替换
  
   */
  type ServerAlias = '@local' | '@server01.origin' | '@server01.api';

  interface Base {
    /** 请求控制器 */
    controller?: AbortController;

    /** 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream' */
    responseType?: 'text' | 'document' | 'json' | 'blob' | 'arraybuffer' | 'stream';

    /** 请求方式 */
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT';

    baseURL: ServerAlias;

    /** 超时时间：毫秒 */
    timeout?: number;

    /** 请求头，默认带有Authorization，需要的时候可以覆盖默认值 */
    headers?: Record<string, string>;
  }

  interface ResponseRecords<T = any> {
    data: {
      current: number;
      total: number;
      records: T[];
    };
    code: number;
    msg: string;
  }

  interface ResponseData<T = any> {
    code: number;
    msg: string;
    error: string;
    data: T;
  }
}
