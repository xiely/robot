import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { itemVo, posForm, itemQuery } from './types';

/**
 * 查询列表
 * @param query
 * @returns {*}
 */

export const materialBinList = (query?: itemQuery): AxiosPromise<itemVo[]> => {
  return request({
    url: '/materialBin/listPage',
    method: 'get',
    params: query
  });
};


/**
 * 新增
 * @param data
 */
export const addMaterialBin = (data: posForm) => {
  return request({
    url: '/materialBin/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改
 * @param data
 */
export const updateMaterialBin = (data: posForm) => {
  return request({
    url: '/materialBin/update',
    method: 'post',
    data: data
  });
};

/**
 * 删除
 * @param id
 */
export const delMaterialBin = (id: string | number | Array<string | number>) => {
  return request({
    url: `/materialBin/${id}`,
    method: 'delete'
  });
};

