import axios from "axios";
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getStorage } from '@/utils/index'
class Request {
  // axios 实例
  instance: AxiosInstance;
  // baseConfig: AxiosRequestConfig = { baseURL: "/api", timeout: 60000 };
  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(config);
    // this.instance = axios.create(Object.assign(this.baseConfig, config));
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 一般会请求拦截里面加token
        const token = getStorage('token');
        config.headers!.Authorization = token;
        // let { data = {}, method } = config
        // 获取截取到请求参数，做一些处理
        return config;
      },
      (err: any) => {
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res，当然你也可以只返回res.data
        if (Object.prototype.toString.apply(res.data) === '[object Blob]') {
          return res.data
        }
        const { data, code, message } = res.data
        if (code === 200) {
          // 请求成功
          return data
        } else {
          // 错误提醒
          return Promise.reject(res)
        }
      },
      (err: any) => {
        // 请求错误
        return Promise.reject(err.response);
      }
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    console.log(555);
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T>{
    return this.instance.delete(url, config);
  }
}

export default Request;