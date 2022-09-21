/**
 * 常量定义文件，包含enum，const
 * 命名要求：以类型首字母大写开头，后面具体场景命名（驼峰写法）
 */

/** 当前页面URL，不带参数 */

const CKeyStoragePrefix = 'utilities_';

/** 最大绑定账户数 */
export const MAX_BIND_ACCOUNT = 10;
/** 从结果页跳转电子账单页，带数据 */
export const KEY_STORAGE_DATA_FOR_INVOICE = `${CKeyStoragePrefix}dataForInvoice`;
/** 管理账户页面：记录用户是否曾经浏览过guide*/
export const KEY_STORAGE_MANAGE_GUIDE = `${CKeyStoragePrefix}manageGuide`;
/**
 * 添加账户，用户输入账号或姓名的时候出错导致的后端错误码，用红条展示
 * 电费/燃气用这个文案：
 * 账户号码或登记姓名不正确，请确认后再试
 * 賬戶號碼或登記姓名不正確，請確認后再試
 * Incorrect account number/name. Please try again.
 * 物业费用这个文案，并且账户号码要做适配：
 * 账户号码不正确，请确认后再试
 * 賬戶號碼不正確，請確認后再試
 * Incorrect account number. Please try again.
 */
export const ADD_USER_ERROR = [
  '978624033', // 账户类型不正确
  '978624035', // 账户校验失败
  '978624061', // 物业缴费（康业）company_code错误
  '978624062', // 物业缴费（康业） building code错误
  '1611737039', // 账户号码不正确
];

/** 日期格式 */
export enum EDateFormat {
  yyyy = 'YYYY', // 年
  mm = 'MM', // 月
  dd = 'DD', // 日

  hh = 'HH', // 时
  ii = 'II', // 分
  ss = 'SS', // 秒
}

/** 缴费提醒状态 */
export enum ENotifyState {
  /** 未开启 */
  close = 0,
  /** 开启 */
  open = 1,
}

/** 代扣状态 */
export enum EAutopayState {
  /** 未开通 */
  closed = 0,
  /** 本账号已开通 */
  opened = 1,
  /** 账户在其他微信号下开通代扣 */
  openByOtherWx = 2,
}

/** 账单状态 */
export enum EBillState {
  /** 未欠费 */
  settled = 0,
  /** 处理中 */
  processing = 1,
  /** 有欠费，待缴费 */
  owned = 2,
  /** 账户类型不正确 */
  accTypeErr = 3,
  /** 因网络原因超时未拉取成功 */
  timeout = 4,
  /** 账户姓名不正确 **/
  accOrNameErr = 5,
}

/** 账户锁定状态 */
export enum EBillLockState {
  /** 未锁定，可正常支付 */
  unlock = 0,
  /** 被微信平台本人锁住，可正常支付 */
  lockByYourselfOfWx = 1,
  /** 被微信平台其他人锁住，可解锁支付 */
  lockByOtherOfWx = 2,
  /** 被其他平台锁住，不可支付 */
  lockByThirdPartNotWx = 3,
}

/** 缴费单状态 */
export enum EOrderState {
  /** 待支付 */
  paying = 10,
  /** 已支付 */
  paied = 20,
  /** 缴费中 */
  delivering = 30,
  /** 缴费成功 */
  deliverSuccess = 40,
  /** 缴费失败 */
  deliverFail = 50,
  /** 待退款(退款中) */
  refunding = 60,
  /** 退款成功 */
  refundSuccess = 70,
  /** 退款失败 */
  refundFail = 80,
}

/** 缴费方式 */
export enum EOrderType {
  /** 用户主动下单 */
  byUser = 0,
  /** 代扣订单 */
  byAutopay = 1,
}

/** 路由名称+路径 */
export enum ERouterName {
  /** 首页 */
  home = 'home',
  /** 添加账户页 */
  add = 'add',
  /** 账单页 */
  bill = 'bill',
  /** 账户管理页面 */
  manage = 'manage',
  /** 代扣引导页面 */
  autopay = 'autopay',
  /** 缴费结果页 */
  result = 'result',
  /** 协议页面 */
  protocol = 'protocol',
  /** 缴费记录详情页 */
  detail = 'detail',
  /** 缴费记录页 */
  record = 'record',
  /** 扫码中间页 */
  middScan = 'middScan',
  /** 电子发票 */
  eleinvoice = 'eleinvoice',
  /** 屋苑选择列表 */
  areaSelect = 'areaSelect',
  /** 开通代扣结果反馈页 */
  autopayresult = 'autopayresult',
}

/** 业务Id */
export enum EBusinessId {
  /** 电费 */
  power = 'busi_power',
  /** 水费 */
  water = 'busi_water',
  /** 税费 */
  taxes = 'busi_taxes',
  /** 差饷银地租 */
  land = 'busi_land',
  /** 燃气 */
  gas = 'busi_gas',
  /** 一般缴款单 */
  general = 'busi_general',
  /** 八达通 */
  octopus = 'busi_octopus',
  /** 物业 */
  property = 'busi_property',
}

/** 首页业务点击类型 */
export enum EBusinessClickAction {
  /** 扫码缴费 */
  scan = 'scan',
  /** 添加生活缴费账户 */
  add = 'add',
  /** 跳转第3方页面 */
  jump = 'jump',
}

/** 部分channel */
export enum EChannelId {
  /** 启胜管理服务有限公司 */
  kaiShing = '50000070020',
  /** 超卓管理服务有限公司 */
  supreme = '50000070021',
  /** 置富花园有限公司 */
  chiFuFaYuen = '50000070022',
  /** 康乐园物业管理有限公司 */
  hongLokYuen = '50000070023',
  /** 仲量物业 */
  JLL = '50000070010',
  /** 惠信物业 */
  residential = '50000070011',
  /** 海日湾物业 */
  horizon = '50000070012',
  /** 天瑞物业 */
  maison = '50000070002',
  /** 君御物业 */
  grandeur = '50000070003',
  /** 康业物业 */
  hongYip = '50000070000',
  /** 帝誉物业 */
  royalElite = '50000070001',
  /** 中华电力 */
  clp = '50000010000',
  /** towngas */
  towngas = '50000020000',
  /** 水费 */
  water = '50001030000',
  /** 差饷物业估价署 */
  land = '50001040000',
  /** 判定债项利息 */
  judgmentDebt = '50001050000',
  /** 物业税 */
  property = '50001050100',
  /** 购买储税券 */
  taxReserveCertificate = '50001050200',
  /** 法院费用 */
  courtFee = '50001050300',
  /** 印花税 */
  stamp = '50001050400',
  /** 分行登记费 */
  branchRegistrationFee = '50001050500',
  /** 商业登记费 */
  businessRegistrationFee = '50001050600',
  /** 个人入息课税 */
  personalAssessment = '50001050700',
  /** 薪俸税 */
  salaries = '50001050800',
  /** 利得税 */
  profit = '50001050900',
  /** 政府一般缴款单 */
  paymentSlip = '50001060000',
  /** 公司注册处 */
  companyRegistered = '50001070000',
  /** 破产管理署 */
  officialReceiver = '50001090000',
  /** 运输署 */
  transport1 = '50001100000',
  /** 运输署 */
  transport2 = '50001100100',
  /** 运输署 */
  transport3 = '50001100200',
  /** 运输署 */
  transport4 = '50001100300',
  /** 运输署 */
  transport5 = '50001100400',
  /** 入境事务处 */
  immigration1 = '50001080000',
  /** 入境事务处 */
  immigration2 = '50001080100',
  /** 入境事务处 */
  immigration3 = '50001080200',
  /** 入境事务处 */
  immigration4 = '50001080300',
  /** 入境事务处 */
  immigration5 = '50001080400',
  /** 入境事务处 */
  immigration6 = '50001080500',
  /** 入境事务处 */
  immigration7 = '50001080600',
  /** 入境事务处 */
  immigration8 = '50001080700',
  /** 入境事务处 */
  immigration9 = '50001080800',
  /** 入境事务处 */
  immigration10 = '50001080900',
  /** 入境事务处 */
  immigration11 = '50001081000',
  /** 入境事务处 */
  immigration12 = '50001081100',
  /** 入境事务处 */
  immigration13 = '50001081200',
  /** 入境事务处 */
  immigration14 = '50001081300',
  /** 入境事务处 */
  immigration15 = '50001081400',
  /** 入境事务处 */
  immigration16 = '50001081500',
  /** 入境事务处 */
  immigration17 = '50001081600',
  /** 入境事务处 */
  immigration18 = '50001081700',
  /** 入境事务处 */
  immigration19 = '50001081800',
  /** 入境事务处 */
  immigration20 = '50001081900',
  /** 入境事务处 */
  immigration21 = '50001082000',
  /** 入境事务处 */
  immigration22 = '50001082100',
  /** 入境事务处 */
  immigration23 = '50001082200',
  /** 入境事务处 */
  immigration24 = '50001082300',
  /** 入境事务处 */
  immigration25 = '50001082400',
  /** 入境事务处 */
  immigration26 = '50001082500',
  /** 入境事务处 */
  immigration27 = '50001082600',
  /** 入境事务处 */
  immigration28 = '50001082700',
  /** 入境事务处 */
  immigration29 = '50001082800',
  /** 入境事务处 */
  immigration30 = '50001082900',
  /** 入境事务处 */
  immigration31 = '50001083000',
  /** 入境事务处 */
  immigration32 = '50001083100',
  /** 民众安全服务处 */
  civilAidService = '50001160000',
  /** 牌照事务处-民政事务总署 */
  homeAffairs = '50001170000',
  /** 卫生署 */
  health = '50001190000',
  /** 通讯事务管理局办公室 */
  communicationsAuthority = '50001200000',
}

/**
 * 数据上报扩展字段
 */
export enum EReportExternKey {
  futilities_busi = 'futilities_busi', // 业务
  futilities_channel = 'futilities_channel', // 渠道
}
/** 因为埋点的拓展字段和EBusinessId定义的不一致，所以需要映射 */
export const EReportBusid: { [key in EBusinessId]: string } = {
  [EBusinessId.power]: 'electricity',
  [EBusinessId.gas]: 'gas',
  [EBusinessId.water]: 'water',
  [EBusinessId.taxes]: 'taxes',
  [EBusinessId.land]: 'land',
  [EBusinessId.general]: 'general',
  [EBusinessId.octopus]: 'octopus',
  [EBusinessId.property]: 'property',
};
/** 渠道描述 */
export const EReportChannel = {
  [EChannelId.clp]: 'clp',
  [EChannelId.towngas]: 'towngas',
};

/**
 * 中文和中文标点符号的正则表达式
 * 匹配这些标点符号：。 ？ ！ ， 、 ； ： “ ” ‘ ’ （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
 */
export const REGEX_HAN =  '\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5';

/**
 * 代扣执行扣款状态
 */
export enum EAutopayExecutedResult {
  hasPayedByUser = 0, // 主动缴费成功（前端展示”本月已缴费，下月将自动缴费“）
  tobeAutopay = 1, // 待自动缴费
  autopaying = 2, // 缴费中（预留）
  autopayFailedFirst = 31, // 第一次（8:00）自动缴费失败
  autopayFailedSecond = 32, // 第二次（12:00）自动缴费失败
  autopayFailedThird = 33, // 自动缴费失败（第三次，也是当月最后一次），本账单不再进行代扣尝试（前端展示”自动缴费失败，请尽快补缴，避免造成逾期“）
  autopayOK = 4, // 自动缴费成功（前端展示”本月已自动缴费“）
  autopayPreOK = 5, // 自动缴费下月生效，本月请尽快缴费
  default = 99, // 默认值，无意义
}

/**
 * 首页卡片状态描述样式
 */
export enum EHomeStateDescStyle {
  /** 红色 */
  red = 'red',
  /** 灰色 */
  grey = 'grey',
  /** 黑色 */
  black = 'black',
  /** 黄色 */
  yellow = 'yellow',
}
