//每个页面搜索商品监听键盘 跳转并传值给搜索页面
var myInputFirst='';
$(".header-search-content").find("input:first").keyup(function(){
	myInputFirstirst=$(".header-search-content").find("input:first").val();
	localStorage.setItem("myInputFirst",myInputFirst);
});
$(".header-search-content").find("input:last").click(function(){
	window.open("seeks.html")
});