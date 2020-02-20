export default class MyWebsokect {
    constructor(config) {
        this.ws = null;
        this.config = config;
        /* 参数 */
        //心跳时间 30秒一次
        this.heartBeat = 30000;
        //心跳信息：默认为'heartBeat
        this.heartMsg = 'heartBeat';
        //是否自动重连
        this.reConnect = true;
        //重连间隔时间
        this.reConnectTime = 5000;
        //重连次数
        this.reConnectTimes = 10;

        //连接状态
        this.alive = false;

        /* 计时器 */
        //重连计时器
        this.reConnectTimer = null;
        //心跳计时器
        this.heartTimer = null;
    }

    init() {
        console.log("init...");
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        if (!window.WebSocket) {
            console.error("浏览器不支持WebSocket");
            return;
        }
        clearInterval(this.reConnectTimer);
        clearInterval(this.heartTimer);
        let config = this.config;
        this.ws = new WebSocket(config.url);
        this.ws.onopen = () => {
            console.log("onopen...");
            //设置状态为开启
            this.alive = true;
            clearInterval(this.reConnectTimer);
            //连接后进入心跳状态
            this.onHeartBeat();
        }
        this.ws.onclose = () => {
            console.log("onclose...");
            //设置状态为断开
            this.alive = false;
            clearInterval(this.heartTimer);
            //自动重连开启  +  不在重连状态下
            if (this.reConnect == true) {
                /* 断开后立刻重连 */
                this.onReConnect();
            }
        }
    }

    /* 心跳事件 */
    onHeartBeat(func) {
        //在连接状态下
        if (this.alive == true) {
            /* 心跳计时器 */
            this.heartTimer = setInterval(() => {
                //发送心跳信息
                this.send(this.heartMsg)
                if(func) func(this);
                // func ? func(this) : false
            }, this.heartBeat)
        }
    }

    /* 重连事件 */
    onReConnect(func) {
        /* 重连间隔计时器 */
        this.reConnectTimer = setInterval(() => {
            //限制重连次数
            if (this.reConnectTimes <= 0) {
                // 关闭定时器
                // this.isReconnect = false
                clearInterval(this.reConnectTimer);
                // 跳出函数之间的循环
                return;
            } else {
                // 重连一次-1
                this.reConnectTimes--;
            }
            //进入初始状态
            this.init();
            if(func) func(this);
            // func ? func(this) : false
        }, this.reConnectTime);
    }

    /*
     *
     * 对原生方法和事件进行封装
     *
     */

    // 发送消息 
    send(text) {
        if (this.alive == true) {
            text = typeof text == 'string' ? text : JSON.stringify(text)
            this.ws.send(text);
        }
    }

    // 连接成功后触发发
    onopen() {

    }

    // 接收到消息触发
    onmessage(func) {
        console.log("onmessage...");
        this.ws.onmessage = data => {
            if(func) func(data);
        }
    }

    // 关闭后触发
    onclose() {

    }

    // 发生错误后触发
    onerror() {

    }

}

