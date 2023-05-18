/*
 * 由@HuaWeixiang编写
 * 更新日期: 2023.05.20
 * 版本: 1.0
 * 
 * 面板示例↓↓↓
 * [Panel]
 * ReloadProfiles = script-name=ReloadProfiles,update-interval=-1
 * [Script]
 * ReloadProfiles = type=generic,timeout=3,script-path=https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/ReloadProfiles.js,script-update-interval=0,argument=title=配置重载&icon=leaf.arrow.circlepath&color=#ff9933
 * 脚本参数说明:
 * 可选参数"title=xxx" 可以自定义标题
 * 可选参数"icon=xxx" 可以自定义图标,内容为任意有效的 SF Symbol Name,如"&icon=leaf.arrow.circlepath",详细可以下载app https://apps.apple.com/cn/app/sf-symbols-browser/id1491161336
 * 可选参数"color=xxx" 可以自定义图标颜色,内容为颜色的HEX编码,如"&color=#ff9933"
 */
 
$httpAPI("POST", "/v1/profiles/reload", {}, data => {
  let panel = {
    title: "配置重载",
    content: "successed at "+getCurrentDate(),
    icon: "leaf.arrow.circlepath",
    "icon-color": "#ff9933",
  };
  if (typeof $argument != "undefined") {
    let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
    if (arg.title) panel.title = arg.title;
    if (arg.icon) panel.icon = arg.icon;
    if (arg.color) panel["icon-color"] = arg.color;
  }
  $done(panel);

  function getCurrentDate() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    month = month + 1 > 12 ? 1 : month + 1;
    month = month > 9 ? month : "0" + month.toString();
    var day = d.getDate();
    var hour = d.getHours();
    hour = hour > 9 ? hour : "0" + hour.toString();
    var minute = d.getMinutes();
    minute = minute > 9 ? minute : "0" + minute.toString();
    var second = d.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
});
