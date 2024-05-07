// 描述 URL 查询参数的类型或路由位置的类型。
import type { LocationQuery } from 'vue-router';
// 描述了请求的结构和属性
import type { NitroFetchRequest } from 'nitropack';
// 配置网络请求的选项对象的类型
import type { FetchOptions } from 'ofetch';

// 配置函数接收的参数的类型
interface Params {
    url: NitroFetchRequest
    opts?: FetchOptions
    method?: 'get' | 'put' | 'delete' | 'post' | 'patch'
}
interface QeuryItem {
    token?: LocationQuery
}

/**
 * getFetchData对请求方式的封装
 * @param {object} params
 * @param {NitroFetchRequest} params.url                                请求参数地址
 * @param {FetchOptions} params.opts                                    请求参数
 * @param {'get' | 'post' | 'put' | 'delete' | 'patch'} params.method   请求方式
 * @returns {Promise}                                                   请求返回的数据
 */
export async function getFetchData({ url, opts, method = 'get' }: Params) {
    const route = useRoute()
    const query: QeuryItem = route.query
    // 使用Nuxt3自带的useFetch发送请求
    const data = await useFetch(url, {
        method,
        // 请求拦截
        onRequest({ request, options }) {
            // 设置请求头
            // options.headers = { ...options.headers, authorization: 'xxx' };
            if (method === 'post' || method === 'put') {
                options.body = { ...opts };
            } else {
                options.query = Object.assign(query, { ...opts });
            }
        },

        // 响应拦截
        onResponse({ response }) {
            if (response._data.error) {
                console.warn('=== error url: ', url, '\n params:', opts, '\n response:', response._data);
            } else {
                return response;
            }
        },

        onRequestError({ request, options, error }) {
            console.warn('request error', error);
        },
        onResponseError({ request, response, options }) {
            console.warn('request error', response);
        },
    })

    return data
}