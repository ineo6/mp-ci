#!/usr/bin/env node
const program = require('commander');
const packageJson = require('../package.json');
const Ci = require('../lib');

program.version(packageJson.version).usage('[--options ...]');

program
  .command('upload [workspace]')
  .option('-e, --env [value]', '环境', 'dev')
  .option('-t, --type [value]', '项目类型', 'miniProgram')
  .option('--ver [value]', '发布版本号', '0.0.0')
  .option('-d, --desc [value]', '发布简介')
  .option('-p, --pkp [value]', '私钥')
  .option('--test', '输出二维码', true)
  .option('--no-test', '禁止输出二维码')
  .option('-q, --qr [value]', '二维码文件的格式: terminal|base64|image', 'image')
  .option('--proxy [value]', '代理url')
  .option('--robot [value]', '指定CI机器人，1 ~ 30', '1')
  .requiredOption('-qd, --qrDest [value]', '二维码文件保存路径 ', 'preview.png')
  .description('上传代码')
  .action(function(workspace, cmdObj) {
    new Ci({
      workspace: workspace || process.cwd(),
      env: cmdObj.env,
      version: cmdObj.ver,
      desc: cmdObj.desc,
      type: cmdObj.type,
      pkp: cmdObj.pkp,
      robot: cmdObj.robot,
    }).upload({
      qr: cmdObj.qr,
      qrDest: cmdObj.qrDest,
      test: cmdObj.test,
      proxy: cmdObj.proxy,
    });
  });

program
  .command('preview [workspace]')
  .option('-e, --env [value]', '环境', 'dev')
  .option('-t, --type [value]', '项目类型', 'miniProgram')
  .option('-ver, --ver [value]', '发布版本号', '0.0.0')
  .option('-d, --desc [value]', '发布简介', '提交上传')
  .option('-p, --pkp [value]', '私钥', '提交上传')
  .option('-q, --qr [value]', '二维码文件的格式: terminal|base64|image', 'image')
  .option('--pagePath [value]', '预览页面路径')
  .option('--searchQuery [value]', '预览页面路径启动参数')
  .option('--proxy [value]', '代理url')
  .option('--robot [value]', '指定CI机器人，1 ~ 30', '1')
  .requiredOption('-qd, --qrDest [value]', '二维码文件保存路径 ', 'preview.png')
  .description('预览代码')
  .action(function(workspace, cmdObj) {
    new Ci({
      workspace: workspace || process.cwd(),
      env: cmdObj.env,
      version: cmdObj.ver,
      desc: cmdObj.desc,
      type: cmdObj.type,
      pkp: cmdObj.pkp,
      qr: cmdObj.qr,
      qrDest: cmdObj.qrDest,
      robot: cmdObj.robot,
    }).preview({
      qr: cmdObj.qr,
      qrDest: cmdObj.qrDest,
      pagePath: cmdObj.pagePath,
      searchQuery: cmdObj.searchQuery,
      proxy: cmdObj.proxy,
    });
  });

program.parse(process.argv);

program.on('--help', () => {
  console.log('  Examples:');
  console.log('');
  console.log('    $ mp-ci');
  console.log('');
});
