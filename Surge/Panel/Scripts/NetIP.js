/*
 * 由@congcong0806编写
 * 原脚本地址: https://raw.githubusercontent.com/congcong0806/surge-list/master/Script/ipcheck.js
 * 由@HuaWeixiang修改
 * 更新日期: 2023.05.20
 * 版本: 1.0
 * 
 * 面板示例↓↓↓
 * [Panel]
 * NetIP = script-name=NetIP,update-interval=-1
 * [Script]
 * NetIP = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/NetIP.js,script-update-interval=0,argument=title=节点信息&icon=paperplane.fill&color=#ff3399
 * 脚本参数说明:
 * 可选参数"title=xxx" 可以自定义标题
 * 可选参数"icon=xxx" 可以自定义图标,内容为任意有效的 SF Symbol Name,如"&icon=paperplane.fill",详细可以下载app https://apps.apple.com/cn/app/sf-symbols-browser/id1491161336
 * 可选参数"color=xxx" 可以自定义图标颜色,内容为颜色的HEX编码,如"&color=#ff3399"
 */

let url = "http://ip-api.com/json"

$httpClient.get(url, function(error, response, data){
  let jsonData = JSON.parse(data);
  let ip = jsonData.query;
  let isp = jsonData.isp;
  let emoji = getFlagEmoji(jsonData.countryCode);
  let country = jsonData.country;
  let city = jsonData.city;
  
  let panel_result = {
    title: "节点信息",
    content: `IP: ${ip}\nISP: ${isp}\n位置: ${emoji}${country}-${city}`,
    icon: "paperplane.fill",
    "icon-color": "#ff3399",
  }
  if (typeof $argument != "undefined") {
    let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
    if (arg.title) panel_result.title = arg.title;
    if (arg.icon) panel_result.icon = arg.icon;
    if (arg.color) panel_result["icon-color"] = arg.color;
  }
  $done(panel_result);
});

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
