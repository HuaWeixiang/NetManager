/*
 * 由@zZPiglet编写
 * 原脚本地址: https://raw.githubusercontent.com/zZPiglet/Task/master/asset/flushDNS.js
 * 由@HuaWeixiang修改
 * 更新日期: 2023.05.20
 * 版本: 1.0
 * 
 * 面板示例↓↓↓
 * [Panel]
 * DNSFlush = script-name=DNSFlush,update-interval=-1
 * [Script]
 * DNSFlush = type=generic,timeout=3,script-path=https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/DNSFlush.js,script-update-interval=0,argument=title=DNS Flush&icon=leaf.arrow.circlepath&color=#ff9933
 * 脚本参数说明:
 * 可选参数"title=xxx" 可以自定义标题
 * 可选参数"icon=xxx" 可以自定义图标,内容为任意有效的 SF Symbol Name,如"&icon=leaf.arrow.circlepath",详细可以下载app https://apps.apple.com/cn/app/sf-symbols-browser/id1491161336
 * 可选参数"color=xxx" 可以自定义图标颜色,内容为颜色的HEX编码,如"&color=#ff9933"
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
