const fs = require('fs-extra');
/**
 * 读文件，并转换为文本返回
 * @param {*} filePath 绝对路径，
 * @returns 
 */
function readFileContent(filePath) {
  const fileBuffer = fs.readFileSync(filePath);

  return fileBuffer.toString();
}

module.exports = {
  readFileContent,
};
