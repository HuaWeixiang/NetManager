/*
 * 由@getsomecat编写
 * 原脚本地址: https://raw.githubusercontent.com/getsomecat/GetSomeCats/Surge/modules/Panel/MultiPanel/NetPing.js
 * 由@HuaWeixiang修改
 * 更新日期: 2023.05.20
 * 版本: 1.0
 * 
 * 面板示例↓↓↓
 * [Panel]
 * NetPing = script-name=NetPing,update-interval=-1
 * [Script]
 * NetPing = type=generic,timeout=3,script-path=https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/NetPing.js,script-update-interval=0,argument=title=NetPing
 * 
 * 脚本参数说明:
 * 可选参数"title=xxx" 可以自定义标题
 */

let $ = {
  CC:'https://connectivitycheck.platform.hicloud.com/generate_204',
  GG:'https://www.google.com/generate_204',
  GH:'https://www.github.com',
  CF:'http://cp.cloudflare.com/generate_204'
}
!(async () => {
  let panel_result = {
    title: 'NetPing',
    content: '',
  }
  if (typeof $argument != 'undefined') {
    let arg = Object.fromEntries($argument.split('&').map((item) => item.split('=')));
    if (arg.title) panel_result.title = arg.title;
  }
  await Promise.all([http('CC'),http('GG'),http('GH'),http('CF')]).then((x)=>{
    panel_result['content'] = x.join(' ');
    $done(panel_result);
  })
})();
function http(req) {
  return new Promise((r) => {
    let time = Date.now();
    $httpClient.post($[req], (err, resp, data) => {
      r(req +':' +(Date.now() - time)+'ms');
    });
  });
}
