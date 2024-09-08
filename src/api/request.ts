import { printRequestLog } from '@/utils/log';
import { InternalAxiosRequestConfig } from 'axios';

export function logRequest(config: InternalAxiosRequestConfig) {
  printRequestLog({
    method: config.method,
    endPoint: config.url,
    requestParams: config.params,
    requestData: config.data,
    config,
  });

  return config;
}
