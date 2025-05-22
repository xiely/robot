import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { itemVo, posForm, itemQuery } from './types';

/**
 * 查询列表
 * @param query
 * @returns {*}
 */

export const materialTypeList = (query?: itemQuery): AxiosPromise<itemVo[]> => {
  return request({
    url: '/materialType/listPage',
    method: 'get',
    params: query
  });
};


/**
 * 新增
 * @param data
 */
export const addMaterialType = (data: posForm) => {
  return request({
    url: '/materialType/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改
 * @param data
 */
export const updateMaterialType = (data: posForm) => {
  return request({
    url: '/materialType/update',
    method: 'post',
    data: data
  });
};

/**
 * 删除
 * @param id
 */
export const delMaterialType = (id: string | number | Array<string | number>) => {
  return request({
    url: '/materialType/' + id,
    method: 'delete'
  });
};

