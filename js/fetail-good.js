var searchUrl=window.location.search;
var i=searchUrl.indexOf("=");
var gid=searchUrl.slice(i+1);
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
});
