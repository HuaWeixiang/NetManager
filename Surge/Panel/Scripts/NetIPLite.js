/*
 * 由@getsomecat编写
 * 原脚本地址: https://raw.githubusercontent.com/getsomecat/GetSomeCats/Surge/modules/Panel/MultiPanel/NetISP.js
 * 由@HuaWeixiang修改
 * 更新日期: 2023.05.20
 * 版本: 1.0
 * 
 * 面板示例↓↓↓
 * [Panel]
 * NetIPLite = script-name=NetIPLite,update-interval=-1
 * [Script]
 * NetIPLite = type=generic,timeout=3,script-path=https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/NetIPLite.js,script-update-interval=0,argument=title=NetIP
 * 
 * 脚本参数说明:
 * 可选参数"title=xxx" 可以自定义标题
 */
 
let url = "http://ip-api.com/json"
$httpClient.get(url, function(error, response, data){
  let jsonData = JSON.parse(data)
  let ip = jsonData.query
  let isp = jsonData.isp.replace(/, Inc./g, "");
  let country = jsonData.country;
  let city = jsonData.city;
  let citys = jsonData.regionName;
  //去重
  let locationsArray = [country, city, citys];
  let uniqueLocationsArray = [...new Set(locationsArray)];
  let uniqueLocations = uniqueLocationsArray.join("  ");

  let panel_result = {
    title: 'NetIP',
    content: `${ip}   ${isp}\n${uniqueLocations}`,
  }
  if (typeof $argument != 'undefined') {
    let arg = Object.fromEntries($argument.split('&').map((item) => item.split('=')));
    if (arg.title) panel_result.title = arg.title;
  }
  $done(panel_result);
})
