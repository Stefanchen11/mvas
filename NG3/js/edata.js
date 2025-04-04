(function() {
	var userAccount;
	// 网站标识,在易数中申请的AppKey
	var appKey;
	// 网站名称
	var appName;
	// 设备标识
	var visitKey;
	var screenWidth = window.screen.width;
	var screenHeight = window.screen.height;

	var pageName;
	var fromPageName = document.referrer;// 页面来源

	var pageViewID = guidGenerator();

	var runinfotype = "1";// 运行事件类型
	var eventinfotype = "2";// 自定义事件类型
	var baseinfotype = "3";// 基本事件类型
	// 代理页面地址，用于发送域内请求
	var serverUrl = "http://edatasdk.huaweiapi.com/jssdk/";
	// var serverUrl = "http://edatasdk.huaweiapi.com/EDATA_JS/";
	// 默认自动上报
	var autoReport;
	var accessTime = getNowFormatDate(new Date());// 进入页面时间
	var temp = window._edata || [];// 取得外部传入的数据

	_edata = new Object;
	_edata.eventData = temp;
	// _edata作为全局变量，接收自定义事件参数的传入
	var maxStaytime = 1 / 48;// 最长停留时间是半个小时
	var a = false;
	var b = false;
	_edata.push = function(data) {
		if (data[0] == "setEvent") {
			var options = [];
			options.push([ "AccessTime", getNowFormatDate(new Date()) ]);
			options.push([ "UserAccount", userAccount ]);
			options.push([ "AppKey", appKey ]);
			options.push([ "EventName", data[1] ]);
			options.push([ "EventLabel", data[2] ]);
			if(data.length >=4){
				var extendOptions = data[3];
				if(extendOptions instanceof Array){
					for(var i=0;i<extendOptions.length;i++){
						options.push([ extendOptions[i][0], extendOptions[i][1] ]);
					}
				}
			}
			options.push([ "VisitKey", visitKey ]);
			execReq(options, eventinfotype);
		} else if (data[0] == "sendPageInfo") {
			var options = [];
			options.push([ "AccessTime", getNowFormatDate(new Date()) ]);
			options.push([ "UserAccount", userAccount ]);
			options.push([ "AppKey", appKey ]);
			options.push([ "PageName", data[1] ]);
			options.push([ "PageViewID", guidGenerator() ]);
			options.push([ "EventMode", 0 ]);
			options.push([ "AutoPageView", false ]);
			options.push([ "VisitKey", visitKey ]);
			options.push([ "FromPageName", pageName ]);
			execReq(options, runinfotype);
		} else if (data[0] == "setUserAccount") {
			userAccount = data[1];
		} else if (data[0] == "setAppkey") {
			appKey = data[1];
		} else if (data[0] == "setAppName") {
			appName = data[1];
		}

	};

	// 将参数拼裝成用于发送json的形式
	function paramToJsonString(options) {
		str = "{";
		for (var i = 0; i < options.length; i++) {
			var key = '"' + options[i][0] + '"';
			var value;
			if (options[i][0] == "ScreenWidth"
					|| options[i][0] == "ScreenHeight") {
				value = options[i][1];
			} else {
				value = '"' + options[i][1] + '"';
			}
			str = str + key + ":" + value;
			if (i != options.length - 1)
				str += ","
		}
		str += "}";
		return str;
	}

	// 将参数拼裝成用于发送urlencode的形式
	function parseParamToString(options) {
		var str = '';
		for (var i = 0; i < options.length; i++) {
			var key = options[i][0];
			var value = options[i][1];
			if (value == null) {
				value = ""
			}
			if (i > 0)
				str += "&";
			str = str + key + "=" + value;
		}
		return str;
	}
	// 将从外部传入的数据初始化
	function initEdata() {
		var length = _edata.eventData.length;
		for (var i = 0; i < length; i++) {
			if (_edata.eventData[i][0] == "setAppkey") {
				appKey = _edata.eventData[i][1];
			}
			if (_edata.eventData[i][0] == "setUserAccount") {
				userAccount = _edata.eventData[i][1];
			}
			if (_edata.eventData[i][0] == "setAppName") {
				appName = _edata.eventData[i][1];
			}
			if (_edata.eventData[i][0] == "setAutoReport") {
				autoReport = _edata.eventData[i][1];
			}
			if (_edata.eventData[i][0] == "sendPageInfo") {
				pageName = _edata.eventData[i][1];
			}
		}
		// autoReport默认为true
		if (autoReport == undefined) {
			autoReport = true;
		}
		if (autoReport == true && pageName == undefined) {
			pageName = document.URL;
		}
	}

	// 执行请求
	function execReq(options, type) {
		var params = parseParamToString(options);
		//alert(params)
		xssPost(params, type);
	}

	// 上报上次未来得及上报的消息，mode=0表示为进入，mode=1表示离开
	function reportLast(mode) {
		var lastaccessTime = getLocalStorage("AccessTime");
		if (lastaccessTime == null || lastaccessTime == "")// 上次的访问写入的cookie没有过期才上报
		{
			return;
		}
		var options = [];
		options.push([ "AccessTime", lastaccessTime ]);
		options.push([ "UserAccount", getLocalStorage("UserAccount") ]);
		options.push([ "AppKey", getLocalStorage("AppKey") ]);
		// 经测试，"PageName"在iphone 浏览器写入不了cookie，换成CPageName字段
		options.push([ "PageName", getLocalStorage("CPageName") ]);
		options.push([ "PageViewID", getLocalStorage("PageViewID") ]);
		options.push([ "EventMode", mode ]);
		options.push([ "AutoPageView", getLocalStorage("AutoPageView") ]);
		options.push([ "VisitKey", getCookieValue("VisitKey") ]);
		options.push([ "FromPageName", getLocalStorage("FromPageName") ]);
		execReq(options, runinfotype);

	}
	function init() {

		initEdata();// 初始化数据
		visitKey = getCookieValue("VisitKey");
		// 判断是否是第一次登陆，如果是第一次登陆，上报基本信息
		if (visitKey == "") {
			visitKey = guidGenerator();
			addCookie("VisitKey", visitKey, 10 * 365, "/");
			if (userAccount == undefined) {
				userAccount = visitKey;
			}
			var options = [];
			options.push([ "AccessTime", accessTime ]);
			options.push([ "UserAccount", userAccount ]);
			options.push([ "AppKey", appKey ]);
			options.push([ "AppName", appName ]);
			options.push([ "PageViewID", pageViewID ]);
			options.push([ "VisitKey", visitKey ]);
			options.push([ "ScreenWidth", screenWidth ]);
			options.push([ "ScreenHeight", screenHeight ]);
			execReq(options, baseinfotype);
		} else {
			reportLast(1);
		}
		// userAccount如果外部没有传入，则传入visitkey值
		if (userAccount == undefined) {
			userAccount = visitKey;
		}

		setLocalStorage("AccessTime", accessTime);
		// addCookie("AccessTime", accessTime, maxStaytime, "/");
		setLocalStorage("UserAccount", userAccount);
		setLocalStorage("AppKey", appKey);
		setLocalStorage("CPageName", pageName);
		setLocalStorage("AutoPageView", autoReport);
		setLocalStorage("FromPageName", fromPageName);
		setLocalStorage("PageViewID", pageViewID);
		// 上报进入页面的信息
		reportcurrent(accessTime, 0);
	}

	// 上报页面进入信息，mode表示离开还是进入
	function reportcurrent(nowtime, mode) {
		var options = [];
		options.push([ "AccessTime", nowtime ]);
		options.push([ "UserAccount", userAccount ]);
		options.push([ "AppKey", appKey ]);
		options.push([ "PageName", pageName ]);
		options.push([ "PageViewID", pageViewID ]);
		options.push([ "EventMode", mode ]);
		options.push([ "AutoPageView", autoReport ]);
		options.push([ "VisitKey", visitKey ]);
		options.push([ "FromPageName", fromPageName ]);
		execReq(options, runinfotype);
	}

	function addCookie(name, value, days, path) {
		var name = escape(name);
		var value = escape(value);
		var expires = new Date();
		expires.setTime(expires.getTime() + days * 3600000 * (24));
		// path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用
		path == "" ? "" : ";path=" + path;
		// GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是GMT
		// 参数days只能是数字型
		var _expires = (typeof days) == "string" ? "" : ";expires="
				+ expires.toGMTString();
		cookies = name + "=" + value + _expires + path;
		document.cookie = cookies;
	}

	function getCookieValue(name) {
		// 用处理字符串的方式查找到key对应value
		var name = escape(name);
		// 读cookie属性，这将返回文档的所有cookie
		var allcookies = document.cookie;
		// 查找名为name的cookie的开始位置
		name += "=";
		var pos = allcookies.indexOf(name);
		// 如果找到了具有该名字的cookie，那么提取并使用它的值
		if (pos != -1) { // 如果pos值为-1则说明搜索"version="失败
			var start = pos + name.length; // cookie值开始的位置
			var end = allcookies.indexOf(";", start); // 从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
			if (end == -1)
				end = allcookies.length; // 如果end值为-1说明cookie列表里只有一个cookie
			var value = allcookies.substring(start, end); // 提取cookie的
			return unescape(value); // 对它解码
		} else { // 搜索失败，返回空字符串
			return "";
		}
	}

	function deleteCookie(name, path) {
		/** 根据cookie的键，删除cookie，其实就是设置其失效* */
		var name = escape(name);
		var expires = new Date(0);
		path == "" ? "" : ";path=" + path;
		document.cookie = name + "=" + ";expires=" + expires.toGMTString()
				+ path;
	}
	// 获取当前时间
	function getNowFormatDate(date) {
		var seperator1 = "";
		var seperator2 = "";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		if (hours >= 0 && hours <= 9) {
			hours = "0" + hours;
		}

		if (minutes >= 0 && minutes <= 9) {
			minutes = "0" + minutes;
		}
		if (seconds >= 0 && seconds <= 9) {
			seconds = "0" + seconds;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1
				+ strDate + "" + hours + seperator2 + minutes + seperator2
				+ seconds;
		return currentdate;
	}

	// 生成模拟的唯一的visitKey
	function guidGenerator() {
		var randn = function() {
			var str = ""
			for (i = 0; i < 6; i++) {
				str += Math.floor(Math.random() * 10);
			}
			return str;
		};
		var timestamp = Date.parse(new Date())
		return (timestamp + randn());
	}

	/*
	 * 现代浏览器通过addEvListener绑定DOMContentLoaded,包括ie9+
	 * ie6-8通过判断doScroll判断DOM是否加载完毕
	 */

	(function bindReady() {
		if (window.addEventListener) {
			document.addEventListener('DOMContentLoaded', domHasAlready, false);
		} else if (window.attachEvent) {
			doScroll();
		}
	})();

	function doScroll() {
		try {
			document.documentElement.doScroll('left');
		} catch (error) {
			return setTimeout(doScroll, 20);
		}
		;
		domHasAlready();
	}

	// stateChanged 在页面tab切换时调用，兼容ie10及以上，firefox，chrome的较新版本，android4.4以下浏览器
	function stateChanged() {
		if (document.hidden || document.webkitHidden || document.msHidden
				|| document.mozHidden) {
			if (b == false)// 避免多次提交
			{
				a = false;
				b = true;
				reportcurrent(accessTime, 1);
			}
		} else {

			if (a == false)// 避免多次提交
			{

				accessTime = getNowFormatDate(new Date());
				// 当前的页面信息写入cookie，下次切换tab时就可取出上报
				setLocalStorage("AccessTime", accessTime);
				// addCookie("AccessTime", accessTime, maxStaytime, "/");
				setLocalStorage("UserAccount", userAccount);
				setLocalStorage("AppKey", appKey);
				setLocalStorage("CPageName", pageName);
				setLocalStorage("AutoPageView", autoReport);
				setLocalStorage("FromPageName", fromPageName);
				setLocalStorage("PageViewID", pageViewID);
				reportcurrent(accessTime, 0);// 上报当前重新显示的页面信息
				a = true;
				b = false;
			}
		}

	}

	function domHasAlready() {
		init();
		attachEventListener(document, "visibilitychange", stateChanged);
		attachEventListener(document, "webkitvisibilitychange", stateChanged);
		attachEventListener(document, "msvisibilitychange", stateChanged);
		attachEventListener(document, "ovisibilitychange", stateChanged);
		attachEventListener(document, "mozvisibilitychange", stateChanged);

	}
	// 绑定事件
	function attachEventListener(obj, e, fun) {
		obj.attachEvent ? obj.attachEvent("on" + e, fun) : obj
				.addEventListener(e, fun, false);
	}

	function setLocalStorage(a, b) {

		if (window.localStorage) {
			// ie8 ，b不能= ""
			if (b != null && b != "") {
				localStorage.setItem(a, b);
			} else {
				localStorage.removeItem(a);
			}

		} else {
			addCookie(a, b, 1 / 48, "/");
		}
	}

	function getLocalStorage(a) {
		if (window.localStorage) {
			return localStorage.getItem(a);

		} else {
			return getCookieValue(a);
		}

	}
	function removeLocalStorage(a) {

		if (window.localStorage) {
			localStorage.removeItem(a);
		} else {
			deleteCookie(a, "/");
		}
	}

	function xssPost(postStr, type) {
		var image = new Image;
		image.src = serverUrl + 'download/1.png?' + postStr + '&type=' + type;
	}

})();
