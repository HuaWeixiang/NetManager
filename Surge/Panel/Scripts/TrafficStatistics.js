/*
 * 由@fishingworld编写
 * 原脚本地址: https://raw.githubusercontent.com/fishingworld/something/main/PanelScripts/trafficstatistics.js
 * 由@HuaWeixiang修改
 * 更新日期: 2023.05.20
 * 版本: 1.0
 * 
 * 面板示例↓↓↓
 * [Panel]
 * TrafficStatistics = script-name=TrafficStatistics,update-interval=1
 * [Script]
 * TrafficStatistics = type=generic,timeout=3,script-path= https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/TrafficStatistics.js,script-update-interval=0,argument=title=流量统计&icon=speedometer&color=#ff6666
 * 脚本参数说明:
 * 可选参数"title=xxx" 可以自定义标题
 * 可选参数"icon=xxx" 可以自定义图标,内容为任意有效的 SF Symbol Name,如"&icon=speedometer",详细可以下载app https://apps.apple.com/cn/app/sf-symbols-browser/id1491161336
 * 可选参数"color=xxx" 可以自定义图标颜色,内容为颜色的HEX编码,如"&color=#ff6666"
 */
 
;(async () => {
  let traffic = (await httpAPI("/v1/traffic"));
  let interface = traffic.interface;
  
  /* 获取所有网络界面 */
  let allNet = [];
  for (var key in interface){
    allNet.push(key);
  }
  if(allNet.includes("lo0") == true){
    del(allNet,"lo0");
  }
  
  let net;
  let index;
  if( $persistentStore.read("NETWORK") == null || allNet.includes($persistentStore.read("NETWORK")) == false){
    index = 0;
  }else{
    net = $persistentStore.read("NETWORK");
    for(let i = 0; i < allNet.length; ++i) {
      if(net == allNet[i]){
        index=i;
      }
    }
  }

  /* 手动执行时切换网络界面 */
  if($trigger == "button"){
    if(allNet.length>1) index += 1;
    if(index>=allNet.length) index = 0;
    $persistentStore.write(allNet[index],"NETWORK");
  };

  net = allNet[index];
  let network = interface[net];

  let outCurrentSpeed = speedTransform(network.outCurrentSpeed); //上传速度
  let outMaxSpeed = speedTransform(network.outMaxSpeed); //最大上传速度
  let download = bytesToSize(network.in); //下载流量
  let upload = bytesToSize(network.out); //上传流量
  let inMaxSpeed = speedTransform(network.inMaxSpeed); //最大下载速度
  let inCurrentSpeed = speedTransform(network.inCurrentSpeed); //下载速度

  /* 判断网络类型 */
  let netType;
  if(net == "en0") {
    netType = "WiFi";
  }else{
    netType = "Cellular";
  }

  let panel = {
    title: "流量统计 | "+netType,
    content: `流量 ➟ ${upload} | ${download}\n速度 ➟ ${outCurrentSpeed} | ${inCurrentSpeed}\n峰值 ➟ ${outMaxSpeed} | ${inMaxSpeed}`,
    icon: "speedometer",
    "icon-color": "#ff6666",
  };

  if (typeof $argument != "undefined") {
    let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
    if (arg.title) panel.title = arg.title+" | "+netType;
    if (arg.icon) panel.icon = arg.icon;
    if (arg.color) panel["icon-color"] = arg.color;
  }
  $done(panel);
})()

function bytesToSize(bytes) {
  if (bytes === 0) return "0B";
  let k = 1024;
  sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

function speedTransform(bytes) {
  if (bytes === 0) return "0B/s";
  let k = 1024;
  sizes = ["B/s", "KB/s", "MB/s", "GB/s", "TB/s", "PB/s", "EB/s", "ZB/s", "YB/s"];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

function httpAPI(path = "", method = "GET", body = null) {
  return new Promise((resolve) => {
    $httpAPI(method, path, body, (result) => {
      resolve(result);
    });
  });
};

function del(arr,num) {
  var l=arr.length;
  for (var i = 0; i < l; i++) {
    if (arr[0]!==num) { 
      arr.push(arr[0]);
    }
    arr.shift(arr[0]);
  }
  return arr;
}
