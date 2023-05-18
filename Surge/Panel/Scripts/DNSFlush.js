/*
 * ��@zZPiglet��д
 * ԭ�ű���ַ: https://raw.githubusercontent.com/zZPiglet/Task/master/asset/flushDNS.js
 * ��@HuaWeixiang�޸�
 * ��������: 2023.05.20
 * �汾: 1.0
 * 
 * ���ʾ��������
 * [Panel]
 * DNSFlush = script-name=DNSFlush,update-interval=-1
 * [Script]
 * DNSFlush = type=generic,timeout=3,script-path=https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/DNSFlush.js,script-update-interval=0,argument=title=DNS Flush&icon=leaf.arrow.circlepath&color=#ff9933
 * �ű�����˵��:
 * ��ѡ����"title=xxx" �����Զ������
 * ��ѡ����"icon=xxx" �����Զ���ͼ��,����Ϊ������Ч�� SF Symbol Name,��"&icon=leaf.arrow.circlepath",��ϸ��������app https://apps.apple.com/cn/app/sf-symbols-browser/id1491161336
 * ��ѡ����"color=xxx" �����Զ���ͼ����ɫ,����Ϊ��ɫ��HEX����,��"&color=#ff9933"
 */
 
!(async () => {
  let panel = {
    title: "Flush DNS",
    icon: "leaf.arrow.circlepath",
    "icon-color": "#ff9933",
  },
  showServer = true,
  dnsCache;
  if (typeof $argument != "undefined") {
    let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
    if (arg.title) panel.title = arg.title;
    if (arg.icon) panel.icon = arg.icon;
    if (arg.color) panel["icon-color"] = arg.color;
    if (arg.server == "false") showServer = false;
  }
  if (showServer) {
    dnsCache = (await httpAPI("/v1/dns", "GET")).dnsCache;
    dnsCache = [...new Set(dnsCache.map((d) => d.server))].toString().replace(/,/g, "\n");
  }
  if ($trigger == "button") await httpAPI("/v1/dns/flush");
  let delay = ((await httpAPI("/v1/test/dns_delay")).delay * 1000).toFixed(0);
  panel.content = `delay: ${delay}ms${dnsCache ? `\nserver:\n${dnsCache}` : ""}`;
  $done(panel);
})();

function httpAPI(path = "", method = "POST", body = null) {
  return new Promise((resolve) => {
    $httpAPI(method, path, body, (result) => {
      resolve(result);
    });
  });
}
