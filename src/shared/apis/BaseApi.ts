import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const AGENT = axios.create();

export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

interface BaseConfig {
  url: string;
  params?: Object;
}

interface PostConfig extends BaseConfig {
  data: Object;
}

interface DeleteConfig extends BaseConfig {
  data?: Object;
}

export default class BaseApi {
  constructor(protected agent: AxiosInstance = AGENT) {}

  async get<T>(config: BaseConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.GET, config, extra);
  }

  async post<T>(config: PostConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.POST, config, extra);
  }

  async delete<T>(config: DeleteConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.DELETE, config, extra);
  }

  async put<T>(config: PostConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.PUT, config, extra);
  }

  async patch<T>(config: PostConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.PATCH, config, extra);
  }

  private async request<T>(
    method: HttpMethods,
    config: BaseConfig | PostConfig,
    extra: AxiosRequestConfig = {},
  ): Promise<T> {
    const requestConfig: AxiosRequestConfig = {
      method,
      url: config.url,
      params: config.params || {},
      ...extra,
    };
    if (
      method === HttpMethods.POST ||
      method === HttpMethods.PUT ||
      method === HttpMethods.PATCH ||
      method === HttpMethods.DELETE
    ) {
      requestConfig.data = (config as PostConfig).data || {};
    }

    try {
      const result = await this.agent.request(requestConfig);

      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
