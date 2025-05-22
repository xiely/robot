import { to } from 'await-to-js';
import { getToken, removeToken, setToken } from '@/utils/auth';
import { login as loginApi, logout as logoutApi, getInfo as getUserInfo } from '@/api/login';
import { LoginData } from '@/api/types';
import defAva from '@/assets/images/profile.jpg';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken());
  const name = ref('');
  const nickname = ref('');
  const userId = ref<string | number>('');
  const tenantId = ref<string>('');
  const avatar = ref('');
  const roles = ref<Array<string>>([]); // 用户角色编码集合 → 判断路由权限
  const permissions = ref<Array<string>>([]); // 用户权限编码集合 → 判断按钮权限
  const organize = ref("");
  const containTreeOrganize = ref(false)
  const filterOrganize = ref(false)

  /**
   * 登录
   * @param userInfo
   * @returns
   */
  const login = async (userInfo: LoginData): Promise<void> => {
    const [err, res] = await to(loginApi(userInfo));
    // let res = {
    //   "code": 200,
    //   "msg": "操作成功",
    //   "data": {
    //     "scope": null,
    //     "openid": null,
    //     "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJBWENEczBwcjdBcjZKQVV2b2g4c3VCYnMxdGtlUmI4RyIsImNsaWVudGlkIjoiZTVjZDdlNDg5MWJmOTVkMWQxOTIwNmNlMjRhN2IzMmUiLCJ0ZW5hbnRJZCI6IjAwMDAwMCIsInVzZXJJZCI6MSwidXNlck5hbWUiOiJhZG1pbiIsImRlcHRJZCI6MTAzLCJkZXB0TmFtZSI6IueglOWPkemDqOmXqCIsImRlcHRDYXRlZ29yeSI6IiJ9.1sLZHyDhPN7DO498xONwgw24dNkjHlZ6YAJw5E1hMDg",
    //     "refresh_token": null,
    //     "expire_in": 604799,
    //     "refresh_expire_in": null,
    //     "client_id": "e5cd7e4891bf95d1d19206ce24a7b32e"
    //   }
    // }
    // let err = "";
    if (res) {
      const data = res.data;
      setToken(data.access_token);
      token.value = data.access_token;
      return Promise.resolve();
    }
    return Promise.reject(err);
  };

  // 获取用户信息
  const getInfo = async (): Promise<void> => {
    const [err, res] = await to(getUserInfo());
    // TODO
    // let res = {
    //   "code": 200,
    //   "msg": "操作成功",
    //   "data": {
    //     "user": {
    //       "userId": 1,
    //       "tenantId": "000000",
    //       "deptId": 103,
    //       "userName": "admin",
    //       "nickName": "疯狂的狮子Li",
    //       "userType": "sys_user",
    //       "email": "crazyLionLi@163.com",
    //       "phonenumber": "15888888888",
    //       "sex": "1",
    //       "avatar": null,
    //       "status": "0",
    //       "loginIp": "123.116.112.117",
    //       "loginDate": "2025-05-12 16:19:43",
    //       "remark": "管理员",
    //       "createTime": "2025-01-17 14:33:44",
    //       "deptName": "研发部门",
    //       "roles": [
    //         {
    //           "roleId": 1,
    //           "roleName": "超级管理员",
    //           "roleKey": "superadmin",
    //           "roleSort": 1,
    //           "dataScope": "1",
    //           "menuCheckStrictly": null,
    //           "deptCheckStrictly": null,
    //           "status": "0",
    //           "remark": null,
    //           "createTime": null,
    //           "flag": false,
    //           "superAdmin": true
    //         }
    //       ],
    //       "roleIds": null,
    //       "postIds": null,
    //       "roleId": null
    //     },
    //     "permissions": [
    //       "*:*:*"
    //     ],
    //     "roles": [
    //       "superadmin"
    //     ]
    //   }
    // };
    // let err = ""
    if (res) {
      const data = res.data;
      const user = data.user;
      const profile = user.avatar == '' || user.avatar == null ? defAva : user.avatar;

      if (data.roles && data.roles.length > 0) {
        // 验证返回的roles是否是一个非空数组
        roles.value = data.roles;
        permissions.value = data.permissions;
      } else {
        roles.value = ['ROLE_DEFAULT'];
      }
      name.value = user.userName;
      nickname.value = user.nickName;
      avatar.value = profile;
      userId.value = user.userId;
      tenantId.value = user.tenantId;
      return Promise.resolve();
    }
    return Promise.reject(err);
  };

  // 注销
  const logout = async (): Promise<void> => {
    await logoutApi();
    token.value = '';
    roles.value = [];
    permissions.value = [];
    removeToken();
  };

  const setAvatar = (value: string) => {
    avatar.value = value;
  };

  const setOrganize = (value: string) => {
    console.log(value, "VVVVVVVVVVVVVVVVVVVVVVVV")
    organize.value = value;
  }

  const setContainTreeOrganize = (value: boolean) => {
    containTreeOrganize.value = value;
  }

  const setFilterOrganize = (value: boolean) => {
    filterOrganize.value = value;
  }

  return {
    userId,
    tenantId,
    token,
    nickname,
    avatar,
    roles,
    permissions,
    login,
    getInfo,
    logout,
    setAvatar,
    setOrganize,
    organize,
    setContainTreeOrganize,
    containTreeOrganize,
    filterOrganize,
    setFilterOrganize
  };
});
