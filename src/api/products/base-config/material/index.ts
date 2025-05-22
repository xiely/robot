import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { itemVo, posForm, itemQuery } from './types';

/**
 * 查询列表
 * @param query
 * @returns {*}
 */

export const materialList = (query?: itemQuery): AxiosPromise<itemVo[]> => {
  return request({
    url: '/material/listPage',
    method: 'get',
    params: query
  });
};


/**
 * 新增
 * @param data
 */
export const addMaterial = (data: posForm) => {
  return request({
    url: '/material/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改
 * @param data
 */
export const updateMaterial = (data: posForm) => {
  return request({
    url: '/material/update',
    method: 'post',
    data: data
  });
};

/**
 * 删除
 * @param id
 */
export const delMaterial = (id: string | number | Array<string | number>) => {
  return request({
    url: `/material/${id}`,
    method: 'delete'
  });
};

