import { defineStore } from 'pinia';
import router, { constantRoutes, dynamicRoutes } from '@/router';
import store from '@/store';
import { getRouters } from '@/api/menu';
import auth from '@/plugins/auth';
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import ParentView from '@/components/ParentView/index.vue';
import InnerLink from '@/layout/components/InnerLink/index.vue';
import { ref } from 'vue';
import { createCustomNameComponent } from '@/utils/createCustomNameComponent';

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue');
export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([]);
  const addRoutes = ref<RouteRecordRaw[]>([]);
  const defaultRoutes = ref<RouteRecordRaw[]>([]);
  const topbarRouters = ref<RouteRecordRaw[]>([]);
  const sidebarRouters = ref<RouteRecordRaw[]>([]);

  const getRoutes = (): RouteRecordRaw[] => {
    return routes.value as RouteRecordRaw[];
  };
  const getDefaultRoutes = (): RouteRecordRaw[] => {
    return defaultRoutes.value as RouteRecordRaw[];
  };
  const getSidebarRoutes = (): RouteRecordRaw[] => {
    return sidebarRouters.value as RouteRecordRaw[];
  };
  const getTopbarRoutes = (): RouteRecordRaw[] => {
    return topbarRouters.value as RouteRecordRaw[];
  };

  const setRoutes = (newRoutes: RouteRecordRaw[]): void => {
    addRoutes.value = newRoutes;
    routes.value = constantRoutes.concat(newRoutes);
  };
  const setDefaultRoutes = (routes: RouteRecordRaw[]): void => {
    defaultRoutes.value = constantRoutes.concat(routes);
  };
  const setTopbarRoutes = (routes: RouteRecordRaw[]): void => {
    topbarRouters.value = routes;
  };
  const setSidebarRouters = (routes: RouteRecordRaw[]): void => {
    sidebarRouters.value = routes;
  };
  const generateRoutes = async (): Promise<RouteRecordRaw[]> => {
    console.log('generateRoutes')
    // const res = await getRouters();
    let res = {
      "code": 200,
      "msg": "操作成功",
      "data": [
        {
          "name": "Order",
          "path": "/order",
          "hidden": false,
          "redirect": "noRedirect",
          "component": "Layout",
          "alwaysShow": true,
          "meta": {
            "title": "订单管理",
            "icon": "bill",
            "noCache": false,
            "link": null
          },
          "children": [
            {
              "name": "OrderManagement",
              "path": "orderManagement",
              "hidden": false,
              "component": "order/orderManagement/index",
              "meta": {
                "title": "订单管理",
                "noCache": false,
                "link": null
              }
            },
            {
              "name": "WechatPay",
              "path": "wechatPay",
              "hidden": false,
              "component": "order/orderManagement/wechat-pay",
              "meta": {
                "title": "微信支付",
                "noCache": false,
                "link": null
              }
            },
            {
              "name": "PosPay",
              "path": "posPay",
              "hidden": false,
              "component": "order/orderManagement/pos-pay",
              "meta": {
                "title": "POS机支付",
                "noCache": false,
                "link": null
              }
            },
            {
              "name": "PayBind",
              "path": "payBind",
              "hidden": false,
              "component": "order/orderManagement/pay-bind",
              "meta": {
                "title": "支付绑定",
                "noCache": false,
                "link": null
              }
            },
            {
              "name": "orderList",
              "path": "orderList",
              "hidden": false,
              "component": "order/orderManagement/order-list",
              "meta": {
                "title": "订单列表",
                "noCache": false,
                "link": null
              }
            }
          ],
        },
        {
          "name": "Products",
          "path": "/products",
          "hidden": false,
          "redirect": "noRedirect",
          "component": "Layout",
          "alwaysShow": true,
          "meta": {
            "title": "基础餐品库",
            "icon": "setting",
            "noCache": false,
            "link": null
          },
          "children": [
            {
              "name": "Menus",
              "path": "menus",
              "hidden": false,
              "component": "products/menus/index",
              "meta": {
                "title": "菜单模版",
                "noCache": false,
                "link": null
              }
            },
            {
              "name": "Config",
              "path": "config",
              "hidden": false,
              "component": "products/config/index",
              "meta": {
                "title": "餐品配置",
                "noCache": false,
                "link": null
              }
            },
            {
              "name": "BaseConfig",
              "path": "baseConfig",
              "hidden": false,
              "component": "products/baseConfig/index",
              "meta": {
                "title": "物料品类",
                "noCache": false,
                "link": null
              }
            },
            // {
            //   "name": "Menu102",
            //   "path": "menu",
            //   "hidden": false,
            //   "component": "system/menu/index",
            //   "meta": {
            //     "title": "菜单管理",
            //     "noCache": false,
            //     "link": null
            //   }
            // },
            // {
            //   "name": "Dept103",
            //   "path": "dept",
            //   "hidden": false,
            //   "component": "system/dept/index",
            //   "meta": {
            //     "title": "组织管理",
            //     "noCache": false,
            //     "link": null
            //   }
            // },
          ]
        },
        {
          "name": "System1",
          "path": "/system",
          "hidden": false,
          "redirect": "noRedirect",
          "component": "Layout",
          "alwaysShow": true,
          "meta": {
            "title": "用户管理",
            "icon": "user",
            "noCache": false,
            "link": null
          },
          "children": [
            {
              "name": "User100",
              "path": "user",
              "hidden": false,
              "component": "system/user/index",
              "meta": {
                "title": "用户管理",
                "noCache": false,
                "link": null
              }
            },
            {
              "name": "Role101",
              "path": "role",
              "hidden": false,
              "component": "system/role/index",
              "meta": {
                "title": "角色管理",
                "noCache": false,
                "link": null
              }
            },
            {
              "name": "Menu102",
              "path": "menu",
              "hidden": false,
              "component": "system/menu/index",
              "meta": {
                "title": "菜单管理",
                "noCache": false,
                "link": null
              }
            },
            {
              "name": "Dept103",
              "path": "dept",
              "hidden": false,
              "component": "system/dept/index",
              "meta": {
                "title": "组织管理",
                "noCache": false,
                "link": null
              }
            },
            // {
            //   "name": "Post104",
            //   "path": "post",
            //   "hidden": false,
            //   "component": "system/post/index",
            //   "meta": {
            //     "title": "岗位管理",
            //     "icon": "post",
            //     "noCache": false,
            //     "link": null
            //   }
            // },
            // {
            //   "name": "Dict105",
            //   "path": "dict",
            //   "hidden": false,
            //   "component": "system/dict/index",
            //   "meta": {
            //     "title": "字典管理",
            //     "icon": "dict",
            //     "noCache": false,
            //     "link": null
            //   }
            // },
            // {
            //   "name": "Config106",
            //   "path": "config",
            //   "hidden": false,
            //   "component": "system/config/index",
            //   "meta": {
            //     "title": "参数设置",
            //     "noCache": false,
            //     "link": null
            //   }
            // },
            // {
            //   "name": "Notice107",
            //   "path": "notice",
            //   "hidden": false,
            //   "component": "system/notice/index",
            //   "meta": {
            //     "title": "通知公告",
            //     "noCache": false,
            //     "link": null
            //   }
            // },
            // {
            //   "name": "Log108",
            //   "path": "log",
            //   "hidden": false,
            //   "redirect": "noRedirect",
            //   "component": "ParentView",
            //   "alwaysShow": true,
            //   "meta": {
            //     "title": "日志管理",
            //     "noCache": false,
            //     "link": null
            //   },
            //   "children": [
            //     {
            //       "name": "Operlog500",
            //       "path": "operlog",
            //       "hidden": false,
            //       "component": "monitor/operlog/index",
            //       "meta": {
            //         "title": "操作日志",
            //         "noCache": false,
            //         "link": null
            //       }
            //     },
            //     {
            //       "name": "Logininfor501",
            //       "path": "logininfor",
            //       "hidden": false,
            //       "component": "monitor/logininfor/index",
            //       "meta": {
            //         "title": "登录日志",
            //         "noCache": false,
            //         "link": null
            //       }
            //     }
            //   ]
            // },
            // {
            //   "name": "Oss118",
            //   "path": "oss",
            //   "hidden": false,
            //   "component": "system/oss/index",
            //   "meta": {
            //     "title": "文件管理",
            //     "icon": "upload",
            //     "noCache": false,
            //     "link": null
            //   }
            // },
            // {
            //   "name": "Client123",
            //   "path": "client",
            //   "hidden": false,
            //   "component": "system/client/index",
            //   "meta": {
            //     "title": "客户端管理",
            //     "icon": "international",
            //     "noCache": false,
            //     "link": null
            //   }
            // }
          ]
        },

        // {
        //   "name": "Vizwise.cn/headless-bi-on-tableau-server1921460980514258945",
        //   "path": "/vizwise.cn/headless-bi-on-tableau-server",
        //   "hidden": false,
        //   "component": "Layout",
        //   "meta": {
        //     "title": "测试外链6",
        //     "icon": "",
        //     "noCache": false,
        //     "link": null
        //   }
        // },
        // {
        //   "name": "Www.baidu.com1921460751077441538",
        //   "path": "/www.baidu.com",
        //   "hidden": false,
        //   "component": "Layout",
        //   "meta": {
        //     "title": "测试外链5",
        //     "icon": "",
        //     "noCache": false,
        //     "link": null
        //   }
        // },
        // {
        //   "name": "Https://vizwise.cn/headless-bi-on-tableau-server1921459509978693633",
        //   "path": "https://vizwise.cn/headless-bi-on-tableau-server",
        //   "hidden": false,
        //   "component": "Layout",
        //   "meta": {
        //     "title": "测试外链4",
        //     "icon": "",
        //     "noCache": false,
        //     "link": "https://vizwise.cn/headless-bi-on-tableau-server"
        //   }
        // },
        // {
        //   "name": "Https://vizwise.cn/headless-bi-on-tableau-server1921459411257360386",
        //   "path": "https://vizwise.cn/headless-bi-on-tableau-server",
        //   "hidden": false,
        //   "component": "Layout",
        //   "meta": {
        //     "title": "测试外链3",
        //     "icon": "",
        //     "noCache": false,
        //     "link": "https://vizwise.cn/headless-bi-on-tableau-server"
        //   }
        // },
        // {
        //   "name": "1921459159179689985",
        //   "path": "/",
        //   "hidden": false,
        //   "component": "Layout",
        //   "children": [
        //     {
        //       "name": "Https://vizwise.cn/headless-bi-on-tableau-server1921459159179689985",
        //       "path": "https://vizwise.cn/headless-bi-on-tableau-server",
        //       "hidden": false,
        //       "meta": {
        //         "title": "测试内链2",
        //         "icon": "",
        //         "noCache": false,
        //         "link": "https://vizwise.cn/headless-bi-on-tableau-server"
        //       }
        //     }
        //   ]
        // },
        // {
        //   "name": "Https://vizwise.cn/headless-bi-on-tableau-server1921457218403926018",
        //   "path": "/",
        //   "hidden": false,
        //   "component": "Layout",
        //   "meta": {
        //     "title": "测试内链1",
        //     "icon": "category",
        //     "noCache": false,
        //     "link": null
        //   },
        //   "children": [
        //     {
        //       "name": "Vizwise/cn/headless-bi-on-tableau-server1921457218403926018",
        //       "path": "vizwise/cn/headless-bi-on-tableau-server",
        //       "hidden": false,
        //       "component": "InnerLink",
        //       "meta": {
        //         "title": "测试内链1",
        //         "icon": "category",
        //         "noCache": false,
        //         "link": "https://vizwise.cn/headless-bi-on-tableau-server"
        //       }
        //     }
        //   ]
        // },
        // {
        //   "name": "Https://www.baidu.com1921456989688528898",
        //   "path": "/",
        //   "hidden": false,
        //   "component": "Layout",
        //   "meta": {
        //     "title": "测试内链",
        //     "icon": "caret-back",
        //     "noCache": false,
        //     "link": null
        //   },
        //   "children": [
        //     {
        //       "name": "Baidu/com1921456989688528898",
        //       "path": "baidu/com",
        //       "hidden": false,
        //       "component": "InnerLink",
        //       "meta": {
        //         "title": "测试内链",
        //         "icon": "caret-back",
        //         "noCache": false,
        //         "link": "https://www.baidu.com"
        //       }
        //     }
        //   ]
        // },
        // {
        //   "name": "Https://www.baidu.com/1921414144701202433",
        //   "path": "https://www.baidu.com/",
        //   "hidden": false,
        //   "component": "Layout",
        //   "meta": {
        //     "title": "测试 - 外链",
        //     "icon": "",
        //     "noCache": false,
        //     "link": "https://www.baidu.com/"
        //   }
        // },
        // {
        //   "name": "Tenant6",
        //   "path": "/tenant",
        //   "hidden": false,
        //   "redirect": "noRedirect",
        //   "component": "Layout",
        //   "alwaysShow": true,
        //   "meta": {
        //     "title": "租户管理",
        //     "icon": "chart",
        //     "noCache": false,
        //     "link": null
        //   },
        //   "children": [
        //     {
        //       "name": "Tenant121",
        //       "path": "tenant",
        //       "hidden": false,
        //       "component": "system/tenant/index",
        //       "meta": {
        //         "title": "租户管理",
        //         "icon": "list",
        //         "noCache": false,
        //         "link": null
        //       }
        //     },
        //     {
        //       "name": "TenantPackage122",
        //       "path": "tenantPackage",
        //       "hidden": false,
        //       "component": "system/tenantPackage/index",
        //       "meta": {
        //         "title": "租户套餐管理",
        //         "icon": "form",
        //         "noCache": false,
        //         "link": null
        //       }
        //     }
        //   ]
        // },
        // {
        //   "name": "Monitor2",
        //   "path": "/monitor",
        //   "hidden": false,
        //   "redirect": "noRedirect",
        //   "component": "Layout",
        //   "alwaysShow": true,
        //   "meta": {
        //     "title": "系统监控",
        //     "icon": "monitor",
        //     "noCache": false,
        //     "link": null
        //   },
        //   "children": [
        //     {
        //       "name": "Online109",
        //       "path": "online",
        //       "hidden": false,
        //       "component": "monitor/online/index",
        //       "meta": {
        //         "title": "在线用户",
        //         "icon": "online",
        //         "noCache": false,
        //         "link": null
        //       }
        //     },
        //     {
        //       "name": "Cache113",
        //       "path": "cache",
        //       "hidden": false,
        //       "component": "monitor/cache/index",
        //       "meta": {
        //         "title": "缓存监控",
        //         "icon": "redis",
        //         "noCache": false,
        //         "link": null
        //       }
        //     },
        //     {
        //       "name": "Admin117",
        //       "path": "Admin",
        //       "hidden": false,
        //       "component": "monitor/admin/index",
        //       "meta": {
        //         "title": "Admin监控",
        //         "icon": "dashboard",
        //         "noCache": false,
        //         "link": null
        //       }
        //     },
        //     {
        //       "name": "Https://preview.snailjob.opensnail.com/120",
        //       "path": "https://preview.snailjob.opensnail.com/",
        //       "hidden": false,
        //       "component": "Layout",
        //       "meta": {
        //         "title": "任务调度中心",
        //         "icon": "job",
        //         "noCache": false,
        //         "link": "https://preview.snailjob.opensnail.com/"
        //       }
        //     }
        //   ]
        // },
        // {
        //   "name": "Tool3",
        //   "path": "/tool",
        //   "hidden": false,
        //   "redirect": "noRedirect",
        //   "component": "Layout",
        //   "alwaysShow": true,
        //   "meta": {
        //     "title": "系统工具",
        //     "icon": "tool",
        //     "noCache": false,
        //     "link": null
        //   },
        //   "children": [
        //     {
        //       "name": "Gen115",
        //       "path": "gen",
        //       "hidden": false,
        //       "component": "tool/gen/index",
        //       "meta": {
        //         "title": "代码生成",
        //         "icon": "code",
        //         "noCache": false,
        //         "link": null
        //       }
        //     }
        //   ]
        // },
        // {
        //   "name": "Demo5",
        //   "path": "/demo",
        //   "hidden": false,
        //   "redirect": "noRedirect",
        //   "component": "Layout",
        //   "alwaysShow": true,
        //   "meta": {
        //     "title": "测试菜单",
        //     "icon": "star",
        //     "noCache": false,
        //     "link": null
        //   },
        //   "children": [
        //     {
        //       "name": "Leave11638",
        //       "path": "leave",
        //       "hidden": false,
        //       "component": "workflow/leave/index",
        //       "meta": {
        //         "title": "请假申请",
        //         "icon": "#",
        //         "noCache": false,
        //         "link": null
        //       }
        //     },
        //     {
        //       "name": "Tree1506",
        //       "path": "tree",
        //       "hidden": false,
        //       "component": "demo/tree/index",
        //       "meta": {
        //         "title": "测试树表",
        //         "icon": "#",
        //         "noCache": false,
        //         "link": null
        //       }
        //     },
        //     {
        //       "name": "Demo1500",
        //       "path": "demo",
        //       "hidden": false,
        //       "component": "demo/demo/index",
        //       "meta": {
        //         "title": "测试单表",
        //         "icon": "#",
        //         "noCache": false,
        //         "link": null
        //       }
        //     }
        //   ]
        // },
        // {
        //   "name": "Workflow11616",
        //   "path": "/workflow",
        //   "hidden": false,
        //   "redirect": "noRedirect",
        //   "component": "Layout",
        //   "alwaysShow": true,
        //   "meta": {
        //     "title": "工作流",
        //     "icon": "workflow",
        //     "noCache": false,
        //     "link": null
        //   },
        //   "children": [
        //     {
        //       "name": "Category11622",
        //       "path": "category",
        //       "hidden": false,
        //       "component": "workflow/category/index",
        //       "meta": {
        //         "title": "流程分类",
        //         "icon": "category",
        //         "noCache": false,
        //         "link": null
        //       }
        //     },
        //     {
        //       "name": "ProcessDefinition11620",
        //       "path": "processDefinition",
        //       "hidden": false,
        //       "component": "workflow/processDefinition/index",
        //       "meta": {
        //         "title": "流程定义",
        //         "icon": "process-definition",
        //         "noCache": true,
        //         "link": null
        //       }
        //     },
        //     {
        //       "name": "Monitor11630",
        //       "path": "monitor",
        //       "hidden": false,
        //       "redirect": "noRedirect",
        //       "component": "ParentView",
        //       "alwaysShow": true,
        //       "meta": {
        //         "title": "流程监控",
        //         "icon": "monitor",
        //         "noCache": false,
        //         "link": null
        //       },
        //       "children": [
        //         {
        //           "name": "ProcessInstance11621",
        //           "path": "processInstance",
        //           "hidden": false,
        //           "component": "workflow/processInstance/index",
        //           "meta": {
        //             "title": "流程实例",
        //             "icon": "tree-table",
        //             "noCache": true,
        //             "link": null
        //           }
        //         },
        //         {
        //           "name": "AllTaskWaiting11631",
        //           "path": "allTaskWaiting",
        //           "hidden": false,
        //           "component": "workflow/task/allTaskWaiting",
        //           "meta": {
        //             "title": "待办任务",
        //             "icon": "waiting",
        //             "noCache": true,
        //             "link": null
        //           }
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   "name": "Task11618",
        //   "path": "/task",
        //   "hidden": false,
        //   "redirect": "noRedirect",
        //   "component": "Layout",
        //   "alwaysShow": true,
        //   "meta": {
        //     "title": "我的任务",
        //     "icon": "my-task",
        //     "noCache": false,
        //     "link": null
        //   },
        //   "children": [
        //     {
        //       "name": "MyDocument11629",
        //       "path": "myDocument",
        //       "hidden": false,
        //       "component": "workflow/task/myDocument",
        //       "meta": {
        //         "title": "我发起的",
        //         "icon": "guide",
        //         "noCache": true,
        //         "link": null
        //       }
        //     },
        //     {
        //       "name": "TaskWaiting11619",
        //       "path": "taskWaiting",
        //       "hidden": false,
        //       "component": "workflow/task/taskWaiting",
        //       "meta": {
        //         "title": "我的待办",
        //         "icon": "waiting",
        //         "noCache": true,
        //         "link": null
        //       }
        //     },
        //     {
        //       "name": "TaskFinish11632",
        //       "path": "taskFinish",
        //       "hidden": false,
        //       "component": "workflow/task/taskFinish",
        //       "meta": {
        //         "title": "我的已办",
        //         "icon": "finish",
        //         "noCache": true,
        //         "link": null
        //       }
        //     },
        //     {
        //       "name": "TaskCopyList11633",
        //       "path": "taskCopyList",
        //       "hidden": false,
        //       "component": "workflow/task/taskCopyList",
        //       "meta": {
        //         "title": "我的抄送",
        //         "icon": "my-copy",
        //         "noCache": true,
        //         "link": null
        //       }
        //     }
        //   ]
        // }
      ]
    }
    const { data } = res;
    const sdata = JSON.parse(JSON.stringify(data));
    const rdata = JSON.parse(JSON.stringify(data));
    const defaultData = JSON.parse(JSON.stringify(data));
    const sidebarRoutes = filterAsyncRouter(sdata);
    const rewriteRoutes = filterAsyncRouter(rdata, undefined, true);
    const defaultRoutes = filterAsyncRouter(defaultData);
    const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
    asyncRoutes.forEach((route) => {
      router.addRoute(route);
    });
    setRoutes(rewriteRoutes);
    setSidebarRouters(constantRoutes.concat(sidebarRoutes));
    setDefaultRoutes(sidebarRoutes);
    setTopbarRoutes(defaultRoutes);
    // 路由name重复检查
    duplicateRouteChecker(asyncRoutes, sidebarRoutes);
    return new Promise<RouteRecordRaw[]>((resolve) => resolve(rewriteRoutes));
  };

  /**
   * 遍历后台传来的路由字符串，转换为组件对象
   * @param asyncRouterMap 后台传来的路由字符串
   * @param lastRouter 上一级路由
   * @param type 是否是重写路由
   */
  const filterAsyncRouter = (asyncRouterMap: RouteRecordRaw[], lastRouter?: RouteRecordRaw, type = false): RouteRecordRaw[] => {
    return asyncRouterMap.filter((route) => {
      if (type && route.children) {
        route.children = filterChildren(route.children, undefined);
      }
      // Layout ParentView 组件特殊处理
      if (route.component?.toString() === 'Layout') {
        route.component = Layout;
      } else if (route.component?.toString() === 'ParentView') {
        route.component = ParentView;
      } else if (route.component?.toString() === 'InnerLink') {
        route.component = InnerLink;
      } else {
        route.component = loadView(route.component, route.name as string);
      }
      if (route.children != null && route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, route, type);
      } else {
        delete route.children;
        delete route.redirect;
      }
      return true;
    });
  };
  const filterChildren = (childrenMap: RouteRecordRaw[], lastRouter?: RouteRecordRaw): RouteRecordRaw[] => {
    let children: RouteRecordRaw[] = [];
    childrenMap.forEach(el => {
      el.path = lastRouter ? lastRouter.path + '/' + el.path : el.path;
      if (el.children && el.children.length && el.component?.toString() === 'ParentView') {
        children = children.concat(filterChildren(el.children, el));
      } else {
        children.push(el);
      }
    })
    return children;
  };
  return {
    routes,
    topbarRouters,
    sidebarRouters,
    defaultRoutes,

    getRoutes,
    getDefaultRoutes,
    getSidebarRoutes,
    getTopbarRoutes,

    setRoutes,
    generateRoutes,
    setSidebarRouters
  };
});

// 动态路由遍历，验证是否具备权限
export const filterDynamicRoutes = (routes: RouteRecordRaw[]) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route);
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route);
      }
    }
  });
  return res;
};

export const loadView = (view: any, name: string) => {
  let res;
  for (const path in modules) {
    const viewsIndex = path.indexOf('/views/');
    let dir = path.substring(viewsIndex + 7);
    dir = dir.substring(0, dir.lastIndexOf('.vue'));
    if (dir === view) {
      res = createCustomNameComponent(modules[path], { name });
      return res;
    }
  }
  return res;
};

// 非setup
export const usePermissionStoreHook = () => {
  return usePermissionStore(store);
};

interface Route {
  name?: string | symbol;
  path: string;
  children?: Route[];
}

/**
 * 检查路由name是否重复
 * @param localRoutes 本地路由
 * @param routes 动态路由
 */
function duplicateRouteChecker(localRoutes: Route[], routes: Route[]) {
  // 展平
  function flatRoutes(routes: Route[]) {
    const res: Route[] = [];
    routes.forEach((route) => {
      if (route.children) {
        res.push(...flatRoutes(route.children));
      } else {
        res.push(route);
      }
    });
    return res;
  }

  const allRoutes = flatRoutes([...localRoutes, ...routes]);

  const nameList: string[] = [];
  allRoutes.forEach((route) => {
    const name = route.name.toString();
    if (name && nameList.includes(name)) {
      const message = `路由名称: [${name}] 重复, 会造成 404`;
      console.error(message);
      ElNotification({
        title: '路由名称重复',
        message,
        type: 'error'
      });
      return;
    }
    nameList.push(route.name.toString());
  });
}
