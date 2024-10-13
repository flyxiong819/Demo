const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const fs = require('fs');

async function getFilesPath() {
  return new Promise((resolve, reject) => {
    fs.readdir('dist/js', (err, files) => {
      if (err) {
        return reject(err);
      }
      let res = [];
      res = files.map(file => ({
        absolutePath: path.resolve('dist/js', file),
        releativePath: `js/${file}`
      }));
      resolve(res);
    });
  });
}

module.exports = class SentryWebpackPlugin {
  constructor({ project, token, version, url, retry }) {
    this.organization = 'Tencent';
    this.project = project;
    this.token = token;
    this.version = version;
    this.url = url;
    this.retry = retry || 3;
  }
  apply(complier) {
    complier.hooks.afterEmit.tap('SentryWebpackPlugin', compilation => {
      const appEnv = process.env.VUE_APP_ENV;

      //if (process.argv.includes('--UploadSentry')) {
      if (appEnv === 'production') {
        console.log('sentry plugin: production, createVersion');
        this.createVersion().then(() => {
          this.uploadFiles();
        });
      }
    });
  }
  async createVersion() {
    const createUrl = `http://sentry.oa.com/api/0/projects/${
      this.organization
    }/${this.project}/releases/`;
    const command = `curl ${createUrl} \
    -X POST \
    -H 'Authorization: Bearer ${this.token}' \
    -H 'Content-Type: application/json' \
    -d '{"version": "${this.version}"}' \
    --insecure
    `;

    return exec(command, {
      maxBuffer: 1024 * 500
    })
      .then(res => {
        if (
          res.stdout.match(/502 Bad Gateway/) ||
          res.stderr.match(/502 Bad Gateway/)
        ) {
          console.error('创建新版本失败，请手动创建！');
          console.log(command);
          return;
        }
        console.log('创建新版本成功！');
      })
      .catch(err => {
        console.error('创建新版本失败，错误：', err);
      });
  }
  async uploadFile(path, retry) {
    const uploadUrl = `http://sentry.oa.com/api/0/projects/${
      this.organization
    }/${this.project}/releases/${this.version}/files/`;
    const command = `curl ${uploadUrl} \
    -X POST \
    -H 'Authorization: Bearer ${this.token}' \
    -F file=@${path.absolutePath} \
    -F name="${this.url}${path.releativePath}" \
    --insecure
    `;
    return exec(command)
      .then(res => {
        if (
          res.stdout.match(/502 Bad Gateway/) ||
          res.stderr.match(/502 Bad Gateway/)
        ) {
          if (retry > 0) {
            return this.uploadFile(path, retry - 1);
          } else {
            console.error(`上传${path.releativePath}失败，请手动上传！`);
            console.log(command);
            return;
          }
        }
        console.log(`上传${path.releativePath}成功！`);
      })
      .catch(err => {
        console.error(`上传${path.releativePath}失败，错误：`, err);
      });
  }
  async uploadFiles() {
    getFilesPath()
      .then(paths => {
        let execs = paths.map(path => this.uploadFile(path, this.retry));
        return Promise.all(execs);
      })
      .then(() => {
        console.log('上传完毕！');
      })
      .catch(err => {
        console.error(err);
      });
  }
};
