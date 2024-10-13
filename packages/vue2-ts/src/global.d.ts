interface ActConf {
  isShow: string; // '0' 不展示，'1'展示
  startTime: string; // 开始时间
  endTime: string; // 结束时间
  forpage: string; // 展示所在的页面，'home' vs 'bill'
  actImg: string; // 活动图片
  actUrl: string; // 点击banner跳转的url
  busiId: string; //
  weappPath: string;
  weappUserName: string;
}

interface TypeGParam {
  lang: string;
  systime: string;
  /** 是否关注了公众号 */
  isSubscribed: string;
  /** 是否在代扣白名单 */
  isAutopayWhite: string;
  /** 支持代扣的业务(channel) */
  autopayFlagArray: string;
}
interface Window {
  $__param__: TypeGParam;

  $report: (object) => void;
  noticeConf: object[];
  actConf: ActConf[];
  __page_jumping: boolean;
}

interface Navigator {
  wxuserAgent: string;
}
