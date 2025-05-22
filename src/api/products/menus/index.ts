import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { itemVo, posForm, itemQuery } from './types';

/**
 * 查询列表
 * @param query
 * @returns {*}
 */

export const baseMenuTemplateList = (query?: itemQuery): AxiosPromise<itemVo[]> => {
  return request({
    url: '/baseMenuTemplate/listPage',
    method: 'get',
    params: query
  });
};


/**
 * 新增
 * @param data
 */
export const addBaseMenuTemplate = (data: posForm) => {
  return request({
    url: '/baseMenuTemplate/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改
 * @param data
 */
export const updateBaseMenuTemplate = (data: posForm) => {
  return request({
    url: '/baseMenuTemplate/update',
    method: 'post',
    data: data
  });
};

/**
 * 删除
 * @param id
 */
export const delBaseMenuTemplate = (id: string | number | Array<string | number>) => {
  return request({
    url: `/baseMenuTemplate/${id}`,
    method: 'delete'
  });
};

