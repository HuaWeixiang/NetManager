/*
 * ��@getsomecat��д
 * ԭ�ű���ַ: https://raw.githubusercontent.com/getsomecat/GetSomeCats/Surge/modules/Panel/MultiPanel/NetPing.js
 * ��@HuaWeixiang�޸�
 * ��������: 2023.05.20
 * �汾: 1.0
 * 
 * ���ʾ��������
 * [Panel]
 * NetPing = script-name=NetPing,update-interval=-1
 * [Script]
 * NetPing = type=generic,timeout=3,script-path=https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/NetPing.js,script-update-interval=0,argument=title=NetPing
 * 
 * �ű�����˵��:
 * ��ѡ����"title=xxx" �����Զ������
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
