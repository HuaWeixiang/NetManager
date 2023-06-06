/*
 * 由@Keywos编写
 * 原脚本地址: https://raw.githubusercontent.com/Keywos/rule/main/JS/USPing.js
 * 由@HuaWeixiang修改
 * 更新日期: 2023.05.20
 * 版本: 1.0
 * 
 * 面板示例↓↓↓
 * [Panel]
 * NetPingUS = script-name=NetPingUS,update-interval=-1
 * [Script]
 * NetPingUS = type=generic,timeout=3,script-path=https://raw.githubusercontent.com/HuaWeixiang/NetManager/master/Surge/Panel/Scripts/NetPingUS.js,script-update-interval=0
 */

const url = "http://cp.cloudflare.com/generate_204";
function http() {
  return new Promise((t => {
    let e = Date.now();
    $httpClient.get(url, (() => {
      let n = Date.now();
      t(n - e)
    }))
  }))
}
function saK(t) {
  const e = (new Date).getTime();
  const n = $persistentStore.read("KEYCF");
  const s = n ? JSON.parse(n) : {};
  s[e] = t.join(",");
  const o = Object.keys(s);
  if (o.length > 9) {
    const t = o.sort()[0];
    delete s[t]
  }
  const r = $persistentStore.write(JSON.stringify(s), "KEYCF");
  const i = $persistentStore.read("KEYCF");
  const l = i ? JSON.parse(i) : {};
  const c = Object.values(l).join(",").split(",").map((t => parseInt(t)));
  return c
}
function ptoG(t) {
  const e = 10;
  let n;
  n = Math.max(...t);
  let s = n;
  if (n < 70) {
    s += 200
  } else if (n < 150) {
    s += 150
  } else if (n < 250) {
    s += 100
  } else if (n < 400) {
    s += 2
  } else {
    s = 410
  }
  const o = t.map((t => {
    let n = (t - e) / (s - e);
    if (n > 1) {
      n = 1
    }
    const o = Math.floor(n * 6) + 9601;
    if (o > 9607) {
      return "▇"
    } else if (o < 9601) {
      return "▁"
    } else {
      return String.fromCharCode(o)
    }
  })).join("");
  return o
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
  let s = Math.round(e.reduce(((t, e) => t + e), 0) / e.length);
  let o = `CF: ${s.toString().padEnd(5," ")} ms\t?     Ping: ${t}ms`;
  $done({
    title: o,
    content: n
  })
})();
