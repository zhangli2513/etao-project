var searchUrl=window.location.search;
var i=searchUrl.indexOf("=");
var gid=searchUrl.slice(i+1);
//分割商品详情ID并传值给商品详情页请求
$.get(PRODUCT_HOST+GOODS,{goods_id:gid},function(result){
    // console.log(result.data);
    var obj = '';
    if (result.data.length==2 || result.data.length==1){
        obj = result.data[0];
    }
    // var detailes=$("<div><p>商品详情</p><img src='"+obj.goods_thumb+"'></div>");
    var details = `
        <hr/>
        <div class="container-body"><img class="header-photo" src="${obj.goods_thumb}"></div>
        <div class="container-head">
           <p><big>${obj.goods_name}</big></p>
           <h3>￥${obj.price}</h3>
           <p>${obj.goods_desc}</p>
           <div class="header-box"><button class="header-box-one">-</button><input class="header-box-num" type="text" value="1"></input><button class="header-box-two">+</button></div>
           <div class="body-box"><button>立即购买</button><button class="body-box-join">加入购物车</button><div>
        </div>
        <br/><hr/>`;
    $(".goods-container").html(details);
    $(".header-box-one").click(function(){
    	this.nextSibling.value<=1?1:this.nextSibling.value--;
    });
    $(".header-box-two").click(function(){
    	this.previousSibling.value++;
    });
   //点击加入购物车
    $(".body-box-join").click(function(){
		console.log(gid)
		var shoppingNum=$(".header-box-num").val();	
		localStorage.setItem('goods_id',gid);
		localStorage.setItem('number',shoppingNum);
		var parm = {goods_id:localStorage.getItem('goods_id'),number:localStorage.getItem('number')}
  //点击加入购物车发送更新购物车请求 
  //  每个商品只能添加一次 删除后可再次加入
		$.post(PRODUCT_HOST+CART+"?token="+localStorage.getItem('token'),parm,function(result){
			console.log(result);
			if(result.code==0){
				alert(result.message);
				window.open("shopping-cart.html");
			}else{
				alert('不能重复添加,请去购物车查看');
			};
		})
		
	})
});
