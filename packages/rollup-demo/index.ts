import { IntroduceInfo, PersonInfo } from "./type";

/**
 * 给输入的字符串，加上Hello
 */
export function addHello(str: string): string {
  return `Hello, ${str}`;
}

/**
 * 将对象转为序列化的字符串
 */
export function obj2str(obj: PersonInfo): IntroduceInfo {
  return {
    name: `${obj.firstName} ${obj.lastName}`,
    desc: `My name is ${obj.firstName} ${obj.lastName}. I'm ${obj.age} years old. I'm a ${obj.gender}`,
  };
}
