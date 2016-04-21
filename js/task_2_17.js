/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
//2016-3-31
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var cityList = ["北京","上海","广州","深圳","成都","西安","福州","厦门","沈阳"];
var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
	nowSelectCity: 0,
	nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(aqIndex,targetDate) {
		var chart = document.getElementById('aqi-chart');
		var chartUl = document.createElement('ul');
		var frag = document.createDocumentFragment();
		var colors = ['#1E90FF','#FAFAD2','#FF4500'];
		var i = 0;
		var city = cityList[pageState.nowSelectCity];
		var width,info;
		if(targetDate == 'day'){
			info = '空气质量：'
			width = 10+'px';
		}else if(targetDate == 'week'){
			info = '周平均空气质量：'
			width = 30+'px';
		}else{
			info = '月平均空气质量：'
			width = 100+'px';
		}
		for(var key in aqIndex){
				var chartUlLi = document.createElement('li');
				chartUlLi.style.width = width;
				chartUlLi.style.background = colors[i%3];
				chartUlLi.style.height = aqIndex[key]/3;
				chartUlLi.style.marginTop =300-aqIndex[key]/3;
				chartUlLi.title = key+info+aqIndex[key];
				frag.appendChild(chartUlLi);
				i++;
		}
//		console.log(aqiSourceData['北京']);
		chartUl.appendChild(frag);
		chart.innerHTML = "";
		chart.appendChild(chartUl);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  var target = EventUtil.getTarget(event);
  var targetDate = target.value;
  // 确定是否选项发生了变化
  if(targetDate != pageState.nowGraTime){
  		var sum = 0;
  		var aqIndex = {};
  		if(!targetDate){
		  	targetDate = 'day';
		  }
  		pageState.nowGraTime = targetDate;
  		// 设置对应数据
  	 	var data = chartData[cityList[pageState.nowSelectCity]][targetDate];
		  // 调用图表渲染函数
  		renderChart(data,targetDate);
  }
}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 设置对应数据
  var citySelect = document.getElementById("city-select");  
  var data = chartData[cityList[citySelect.selectedIndex]][pageState.nowGraTime];
	// 确定是否选项发生了变化 
	if(citySelect.selectedIndex != pageState.nowSelectCity){
		  pageState.nowSelectCity = citySelect.selectedIndex;
	}
	renderChart(data,pageState.nowGraTime);
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	 EventUtil.addHandler('click',document.getElementById('form-gra-time'),graTimeChange);
	 var timeSelect = document.getElementById('form-gra-time');
	 var event = document.createEvent('MouseEvents');
	 event.initMouseEvent('click',true,true,document.defaultView);
	 timeSelect.dispatchEvent(event);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
   var cityArray = [];
   for(var city in aqiSourceData){
   		cityArray.push(city);
   }
   var frag = document.createDocumentFragment();
   for(var i = 0;i < cityArray.length;i++){
				var option = document.createElement('option');
				option.innerHTML = cityArray[i];
				frag.appendChild(option);
		}
	 var citySelect =	document.getElementById("city-select");
	 citySelect.appendChild(frag);
	 // 给select设置事件，当选项发生变化时调用函数citySelectChange
	 citySelect.onchange = citySelectChange;
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var cityChartData = {};
  
  for(var i = 0;i < cityList.length;i++){
			//每日数据
		 	cityChartData['day'] = aqiSourceData[cityList[i]];
		 	//每周数据
		 	(function(){
		 			var aqIndex = {};
		 			var j = 1;
		  		var weekNum = 1;var sum = 0;
		  		for(var item in aqiSourceData[cityList[i]]){
		  				if(j <= 7){
		  					 sum = sum + aqiSourceData[cityList[i]][item];
		  					 j++;
		  				}else{
		  					 aqIndex[weekNum.toString()] = Math.ceil(sum/7);
		  					 weekNum++;
		  					 sum = aqiSourceData[cityList[i]][item];
		  					 j = 1;
		  				}
		  		}
		  		aqIndex[weekNum.toString()] = Math.ceil(sum/7);
		  		cityChartData['week'] = aqIndex;
		 	})();
		 	//每月数据
		 	(function(){
		 		var aqIndex = {'01':0};
	  		var count = 0;
	  		var temp = '01';var sum = 0;
	  	  for(var item in aqiSourceData[cityList[i]]){ 
					if(temp == item.slice(5,7)){
							sum = sum + aqiSourceData[cityList[i]][item];
							count++;
					}else{
						  aqIndex[temp] = Math.ceil(sum/count);
						  count = 1;
						  sum = aqiSourceData[cityList[i]][item];
						  temp = item.slice(5,7);
					}
	  	  }
	  	  aqIndex[temp] = Math.ceil(sum/count);
	  	  cityChartData['month'] = aqIndex;
		 	})();
		 	chartData[cityList[i]] = cityChartData;
		 	cityChartData = {};
  }
  console.log(chartData);
}

/**
 * 初始化函数
 */
function init() {
  initAqiChartData();
  initCitySelector();
  initGraTimeForm();
}

init();