/*
 * 由@Keywos编写
 * 原脚本地址: https://raw.githubusercontent.com/Keywos/rule/main/JS/CNPing.js
 * 由@HuaWeixiang修改
 * 更新日期: 2023.05.20
 * 版本: 1.0
 * 
 * 面板示例↓↓↓
 * [Panel]
 * NetPingCN = script-name=NetPingCN,update-interval=-1
 * [Script]
 * NetPingCN = type=generic,timeout=3,script-path=https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/NetPingCN.js,script-update-interval=0
 */

const url = "http://connectivitycheck.platform.hicloud.com/generate_204";
function http() {
  return new Promise((t => {
    let e = Date.now();
    $httpClient.get(url, (() => {
      let n = Date.now();
      t(n - e);
    }))
  }))
}
function saK(t) {
  const e = (new Date).getTime();
  const n = $persistentStore.read("KEYCN");
  const o = n ? JSON.parse(n) : {};
  o[e] = t.join(",");
  const s = Object.keys(o);
  if (s.length > 9) {
    const t = s.sort()[0];
    delete o[t]
  }
  const r = $persistentStore.write(JSON.stringify(o), "KEYCN");
  const c = $persistentStore.read("KEYCN");
  const l = c ? JSON.parse(c) : {};
  const i = Object.values(l).join(",").split(",").map((t => parseInt(t)));
  return i
}
function ptoG(t) {
  const e = 10;
  let n = Math.max(...t);
  let o = n;
  if (n < 50) {
    o += 50
  } else if (n < 100) {
    o += 60
  } else if (n < 300) {
    o += 20
  } else if (n > 300) {
    o = 300
  }
  const s = t.map((t => {
    let n = (t - e) / (o - e);
    if (n > 1) {
      n = 1
    }
    const s = Math.floor(n * 6) + 9601;
    if (s > 9607) {
      return "▇"
    } else if (s < 9601) {
      return "▁"
    } else {
      return String.fromCharCode(s)
    }
  })).join("");
  return s
}
(async() => {
  let t = [];
  for (let e = 0; e < 2; e++) {
    const e = await http(url);
    const n = parseFloat(e);
    t.push(n)
  }
  const e = saK(t);
  const n = ptoG(e);
  let o = Math.round(e.reduce(((t, e) => t + e), 0) / e.length);
  let s = `CN: ${o.toString().padEnd(5," ")} ms\t?     Ping: ${t}ms`;
  $done({
    title: s,
    content: n
  })
})();
