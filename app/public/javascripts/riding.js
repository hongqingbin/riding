var riding = {
	map:null
};
riding.load = function() {
    //加载百度地图
    //根据用户当前位置找出骑行路线
    //将骑行路线标出来
    riding.loadMap();
};

riding.loadMap = function() {
	riding.map = new AMap.Map('riding-map', {
        resizeEnable: true,
        zoom: 15
    });
    riding.map.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        riding.map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
        
    }
    //解析定位错误信息
    function onError(data) {
        
    }
};

riding.loadRidingRoutes = function() {

};

riding.markRoutesOnMap = function(routes) {

};

window.onload = function() {
    riding.load();
};