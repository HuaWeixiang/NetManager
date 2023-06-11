<h1 align="center">Script</h1>

<h3 align="center">机场签到</h3>

```ruby
[Script]
✈️机场签到 = type=cron,cronexp=0 8 * * *,wake-system=1,script-path=https://raw.githubusercontent.com/evilbutcher/Quantumult_X/master/check_in/glados/checkin_env.js,script-update-interval=0
```
>**BoxJs订阅链接 :** https://raw.githubusercontent.com/evilbutcher/QuantumultX/master/evilbutcher.boxjs.json

<h3 align="center">机场流量</h3>

```ruby
[Script]
✈️机场流量 = type=cron,cronexp=0 9 * * *,script-path=https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/flow.js,script-update-interval=0
```
>**BoxJs订阅链接 :** https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/box.js.json

## How to use
### 1. 安装环境
**需要网络调试工具Surge**

### 2. 安装方式
**脚本安装可以直接修改配置文件或在脚本功能页面添加**
>**配置文件修改 :** Surge首页 -> 点击最上方打开Profile页面 -> 在文本模式中编辑 -> 复制上方脚本代码粘贴到配置文件[Script]下 -> 完成......<br>
>**脚本页面添加 :** Surge首页 -> 修改 -> 脚本的脚本 -> 新增 -> 按照上方脚本代码填写 -> 完成......

**BoxJs订阅安装**
>安装[BoxJs](https://github.com/HuaWeixiang/NetManager/tree/master/Surge/Module/BoxJs/README.md) -> 浏览器访问[boxjs.com](http://boxjs.com "BoxJs") -> 订阅 -> 添加 -> 复制粘贴上方BoxJs订阅链接 -> 保存 -> 应用 -> 找到列表里的应用点击收藏 -> 点开应用 -> 设置参数 -> 保存

### 3. 更新方式
**脚本可自动更新和手动更新**
>**自动更新 :** script-update-interval可自定义更新间隔<br>
>**手动更新 :** Surge首页 -> 点击最上方打开Profile页面 -> 外部资源 -> 全部更新|(找到并左滑相关脚本 -> 更新) -> 完成......

**建议两次手动更新之间 _ 间隔5分钟以上，否则有可能页面缓存文档尚未更新导致更新失败，可通过查看代码的方式来确认是否更新成功**
>Surge首页 -> 修改 -> 脚本的编辑器 -> 载入 -> 找到并点击相关脚本 -> 查看代码是否与网页版本相同

**BoxJs订阅更新**
> 浏览器访问[boxjs.com](http://boxjs.com "BoxJs") -> 订阅 -> 更新
