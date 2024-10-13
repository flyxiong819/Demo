// 路由信息，纯JS对象，方便读取路由信息
import { ERouterName } from './config/constants';
import { url, CustomException } from '@tencent/ppd-base-libs';
import { biBrow } from '@tencent/fit-bi-sdk';
import NewHome from './views/new-home/index.vue';
import Entry from './views/entry/index.vue';
import { getAccountData } from '@/business/account';


const routes = [
  {
    component: () => import('./views/autopay-result/index.vue'),
    name: ERouterName.autopayresult,
    path: `/${ERouterName.autopayresult}`,
    cname: '开通代扣结果反馈页',
    beforeEnter: (to, from, next) => {
      // 如果是首次开通，回跳之前已经完成了签约和开通；直接重定向到账单页
      const spSerialno = url.getUrlParam('sp_serialno');
      const token = url.getUrlParam('token');
      if (!token || !spSerialno) {
        const srcpage = url.getUrlParam('srcpage'); // 原来跳转到基础代扣的入口页面
        next({
          name: srcpage || ERouterName.home,
          replace: true,
        });
        biBrow('utilities_autopay_result.first_time_brow|首次开通代扣直接重定向');
      } else {
        next();
      }
    },
  },
  {
    component: () => import('./views/bill/index.vue'),
    name: ERouterName.bill,
    path: `/${ERouterName.bill}`,
    cname: '账单页',
  },
  {
    component: () => import('./views/add/index.vue'),
    name: ERouterName.add,
    path: `/${ERouterName.add}`,
    meta: {
      keepAlive: true, // 这是为了，从别的页面后退回来时，仍然保存填写的信息
    },
    cname: '添加账户页',
  },
  {
    component: () => import('./views/manage/index.vue'),
    name: ERouterName.manage,
    path: `/${ERouterName.manage}`,
    cname: '管理页',
  },
  {
    component: () => import('./views/ele-invoice/index.vue'),
    name: ERouterName.eleinvoice,
    path: `/${ERouterName.eleinvoice}`,
    cname: '电子账单页',
  },
  {
    component: () => import('./views/result/index.vue'),
    name: ERouterName.result,
    path: `/${ERouterName.result}`,
    cname: '缴费结果页',
  },
  {
    component: () => import('./views/protocol/index.vue'),
    name: ERouterName.protocol,
    path: `/${ERouterName.protocol}`,
    cname: '协议页',
  },
  {
    component: () => import('./views/detail/index.vue'),
    name: ERouterName.detail,
    path: `/${ERouterName.detail}`,
    alias: '/HistoryDetails', // 先保留，由于历史原因导致命名风格不一致
    cname: '缴费记录详情页',
  },
  {
    component: () => import('./views/record/index.vue'),
    name: ERouterName.record,
    path: `/${ERouterName.record}`,
    meta: {
      keepAlive: true,
    },
    alias: '/HistoryList', // 先保留，由于历史原因导致命名风格不一致
    cname: '缴费记录页',
  },
  {
    component: () => import('./views/midd-scan/index.vue'),
    name: ERouterName.middScan,
    path: `/${ERouterName.middScan}`,
    cname: '政府缴费扫码页',
  },
  {
    component: () => import('./views/new-midd-scan/index.vue'),
    name: ERouterName.newMiddScan,
    path: `/${ERouterName.newMiddScan}`,
    cname: '政府缴费扫码页',
    meta: {
      keepAlive: true,
    },
  },
  {
    component: () => import('./views/area-select/index.vue'),
    name: ERouterName.areaSelect,
    path: `/${ERouterName.areaSelect}`,
    cname: '屋苑选择页',
  },
  {
    component: Entry,
    name: ERouterName.entry,
    path: `/${ERouterName.entry}`,
    cname: '缴费入口',
    meta: {
      keepAlive: true,
    },
  },
  {
    component: NewHome,
    name: ERouterName.home,
    path: `/${ERouterName.home}`,
    cname: '新首页',
    meta: {
      keepAlive: true,
    },
  },
  {
    beforeEnter: async (to, from, next) => {
      try {
        // 2个接口请求可能报错，需要容错处理
        const accountList = await getAccountData();
        const isNoAccountUser = accountList.length === 0;
        if (isNoAccountUser) {
          // 如果没有账户，直接去新增账户页面
          next({
            path: `/${ERouterName.entry}`,
            replace: true,
          });
        } else {
          next();
        }
      } catch (err) {
        next();
        new CustomException(err, 'DefaultRouterException', '初始化router失败');
      }
    },
    component: NewHome,
    name: ERouterName.home,
    path: '*',
    meta: {
      keepAlive: true,
    },
    cname: '首页',
  },
];

export default {
  routes,
};
