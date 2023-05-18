/*
 * 由@getsomecat编写
 * 原脚本地址: https://raw.githubusercontent.com/getsomecat/GetSomeCats/Surge/modules/Panel/MultiPanel/CFGPT.js
 * 由@HuaWeixiang修改
 * 更新日期: 2023.05.20
 * 版本: 1.0
 * 
 * 面板示例↓↓↓
 * [Panel]
 * CFGPT = script-name=CFGPT,update-interval=-1
 * [Script]
 * CFGPT = type=generic,timeout=3,script-path=https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/CFGPT.js,script-update-interval=0,argument=title=CFGPT
 * 
 * 脚本参数说明:
 * 可选参数"title=xxx" 可以自定义标题
 */
 
let url = "http://chat.openai.com/cdn-cgi/trace"
tf=["T1","XX","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BD","BB","BE","BZ","BJ","BT","BA","BW","BR","BG","BF","CV","CA","CL","CO","KM","CR","HR","CY","DK","DJ","DM","DO","EC","SV","EE","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KW","KG","LV","LB","LS","LR","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG","PE","PH","PL","PT","QA","RO","RW","KN","LC","VC","WS","SM","ST","SN","RS","SC","SL","SG","SK","SI","SB","ZA","ES","LK","SR","SE","CH","TH","TG","TO","TT","TN","TR","TV","UG","AE","US","UY","VU","ZM","BO","BN","CG","CZ","VA","FM","MD","PS","KR","TW","TZ","TL","GB"]
tff=["plus","on"]
let gpt;
let warps;
$httpClient.get(url, function(error, response, data){
  let lines = data.split("\n"); 
  let cf = lines.reduce((acc, line) => {
    let [key, value] = line.split("=");
    acc[key] = value;
    return acc;
  },{});
  let ip = cf.ip
  let warp = cf.warp
  let loc = cf.loc
  //loc
  let l = tf.indexOf(loc)
  if (l != -1) {
    gpt = "\u2713"
  } else {
    gpt = "\u2715"
  }
  //warp
  let w = tff.indexOf(warp)
  if (w != -1) {
    warps = "增强"
  } else {
    warps = "未开启"
  }
  let panel_result = {
    title: 'CFGPT',
    content: `GPT: ${gpt}  Loc: ${loc}  WARP: ${warp} ${warps}`,
  }
  if (typeof $argument != 'undefined') {
    let arg = Object.fromEntries($argument.split('&').map((item) => item.split('=')));
    if (arg.title) panel_result.title = arg.title;
  }
  $done(panel_result);
})
