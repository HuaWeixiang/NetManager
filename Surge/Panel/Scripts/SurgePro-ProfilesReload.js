/*
 * 由@fishingworld编写
 * 原脚本地址: https://raw.githubusercontent.com/fishingworld/something/main/PanelScripts/surgepro_reloadprofile.js
 * 由@HuaWeixiang修改
 * 更新日期: 2023.05.20
 * 版本: 1.0
 * 
 * 面板示例↓↓↓
 * [Panel]
 * SurgePro = script-name=SurgePro,update-interval=1
 * [Script]
 * SurgePro = type=generic,timeout=3,script-path=https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/SurgePro-ProfilesReload.js,script-update-interval=0,argument=title=Surge Pro®&icon=crown.fill&color=#ffd700
 * 脚本参数说明:
 * 可选参数"title=xxx" 可以自定义标题
 * 可选参数"icon=xxx" 可以自定义图标,内容为任意有效的 SF Symbol Name,如"&icon=crown.fill",详细可以下载app https://apps.apple.com/cn/app/sf-symbols-browser/id1491161336
 * 可选参数"color=xxx" 可以自定义图标颜色,内容为颜色的HEX编码,如"&color=#ffd700"
 */

!(async () => {
  //时间获取
  let traffic = (await httpAPI("/v1/traffic","GET"));
  let dateNow = new Date();
  let dateTime = Math.floor(traffic.startTime*1000);
  let startTime = timeTransform(dateNow,dateTime);
  //状态获取
  let mitm_status = (await httpAPI("/v1/features/mitm","GET"));
  let rewrite_status = (await httpAPI("/v1/features/rewrite","GET"));
  let scripting_status = (await httpAPI("/v1/features/scripting","GET"));
  let icon_s = mitm_status.enabled&&rewrite_status.enabled&&scripting_status.enabled;
  //点击按钮，重载配置
  if ($trigger == "button") await httpAPI("/v1/profiles/reload");
  //panel设置
  let panel = {
    title:"Surge Pro®",
    content:`启动时长: ${startTime}`+"\nMitM: "+icon_status(mitm_status.enabled)+"  Rewrite: "+icon_status(rewrite_status.enabled)+"  Scripting: "+icon_status(scripting_status.enabled),
    icon: icon_s?"crown.fill":"exclamationmark.triangle.fill",
    "icon-color": icon_s?"#ffd700":"#f20c00",
  };
  if (typeof $argument != "undefined") {
    let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
    if (arg.title) panel.title = arg.title;
    if (arg.icon && icon_s) panel.icon = arg.icon;
    if (arg.color && icon_s) panel["icon-color"] = arg.color;
  }
  $done(panel);
})();

function icon_status(status){
  if (status){
    return "\u2611";
  } else {
    return "\u2612";
  }
}

function timeTransform(dateNow,dateTime) {
  let dateDiff = dateNow - dateTime;
  let days = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
  let leave1=dateDiff%(24*3600*1000);    //计算天数后剩余的毫秒数
  let hours=Math.floor(leave1/(3600*1000));//计算出小时数
  //计算相差分钟数
  let leave2=leave1%(3600*1000);    //计算小时数后剩余的毫秒数
  let minutes=Math.floor(leave2/(60*1000));//计算相差分钟数
  //计算相差秒数
  let leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
  let seconds=Math.round(leave3/1000);
  if(days==0){
    if(hours==0){
      if(minutes==0)return(`${seconds}秒`);
      return(`${minutes}分${seconds}秒`);
    }
    return(`${hours}时${minutes}分${seconds}秒`);
  }else {
    return(`${days}天${hours}时${minutes}分`);
  }
}

function httpAPI(path = "", method = "POST", body = null) {
  return new Promise((resolve) => {
    $httpAPI(method, path, body, (result) => {
      resolve(result);
    });
  });
}
