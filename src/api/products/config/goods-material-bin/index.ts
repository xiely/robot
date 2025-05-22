import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { itemVo, posForm, itemQuery } from './types';

/**
 * 查询列表
 * @param query
 * @returns {*}
 */

export const baseGoodsMaterialBinList = (query?: itemQuery): AxiosPromise<itemVo[]> => {
  return request({
    url: '/baseGoodMaterialBin/listPage',
    method: 'get',
    params: query
  });
};


/**
 * 新增
 * @param data
 */
export const addBaseGoodsMaterialBin = (data: posForm) => {
  return request({
    url: '/baseGoodMaterialBin/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改
 * @param data
 */
export const updateBaseGoodsMaterialBin = (data: posForm) => {
  return request({
    url: '/baseGoodMaterialBin/update',
    method: 'post',
    data: data
  });
};

/**
 * 删除
 * @param id
 */
export const delBaseGoodsMaterialBin = (id: string | number | Array<string | number>) => {
  return request({
    url: `/baseGoodMaterialBin/${id}`,
    method: 'delete'
  });
};


