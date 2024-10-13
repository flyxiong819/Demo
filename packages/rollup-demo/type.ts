
/** 个人信息 */
export type PersonInfo = {
  /** 名 */
  firstName: string;
  /** 姓 */
  lastName: string;
  /** 年龄 */
  age: number;
  /** 性别 */
  gender: 'male' | 'female';
}

/** 介绍信息 */
export type IntroduceInfo = {
  /** 姓名 */
  name: string;
  /** 描述 */
  desc: string;
}
