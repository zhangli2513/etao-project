//查看购物车商品请求
 $.get(PRODUCT_HOST+CART,{token:localStorage.getItem('token')},function(result){
       console.log(result.data);
    var shopNum=localStorage.getItem('number');
    var details = '';
    result.data.forEach(function(obj){
    	details += `
        <div  class="shopping-header">
        	<div class="checked mychecked">
				<input class='myInputchecked' type="checkbox" checked="checked"/>
			</div>
        	<div class="shop-jion myshop-join" data-id=${obj.goods_id}>
        		<img class="myheader-photo" src="${obj.goods_thumb}">
        		<p>${obj.goods_name}</p>
        	</div>
            <div class="header-box">
            	<button class="header-box-one">-</button><input class="header-box-num" type="text" value=${obj.goods_number}><button class="header-box-two">+</button>
            </div>
            <div class='shop-price myshop-price'>
                <p>￥<span class='minPrice'>${obj.goods_price}</span></p>
            </div>
            <div class='shop-price myshop-price'>
                <p><span class='BigPrice'>${obj.goods_price}</span>元</p>
            </div>
            <div class='shop-price myshop-price'>
                <button class='shopCart-del' data-id='${obj.goods_id}'>删除</button>
            </div>
        </div>
        `;
    });
    $(".goods-container").html(details);
//商品价格总计   
    var BigPriceNum=0;
    $('.BigPrice').each(function(i,data){
    	BigPriceNum+=parseInt($(data).html())
        $('.BigPriceNum').html(BigPriceNum)
	});    
    
//减号商品价格运算
    $(".header-box-one").click(function(){
    	BigPriceNum=0;
    	this.nextSibling.value<=1?1:this.nextSibling.value--;
    	var minPrice=$(this).parent().next().find('.minPrice').html();
    	var BigPrice=minPrice*this.nextSibling.value+'.00';
    	$(this).parent().next().next().find('.BigPrice').html(BigPrice);
    	
    	 $('.BigPrice').each(function(i,data){
	    	BigPriceNum+=parseInt($(data).html())
	        $('.BigPriceNum').html(BigPriceNum)
		});  
    });
//加号商品价格运算

    $(".header-box-two").click(function(){
    	BigPriceNum=0;
    	this.previousSibling.value++;
    	var minPrice=$(this).parent().next().find('.minPrice').html();
    	var BigPrice=minPrice*this.previousSibling.value+'.00';
    	$(this).parent().next().next().find('.BigPrice').html(BigPrice);
    	$('.BigPrice').each(function(i,data){
	    	BigPriceNum+=parseInt($(data).html())
	        $('.BigPriceNum').html(BigPriceNum)
		});  
    });
});
//删除购物车商品请求
$(document).on('click','.shopCart-del',function(){
	var delId=$(this).data('id')
	var parm = {goods_id:delId,number:0}
    	console.log(parm)
		$.post(PRODUCT_HOST+CART+"?token="+localStorage.getItem('token'),parm,function(result){
			console.log(result);
			if(result.code==0){
				console.log($(this))
				$(this).parent().parent().remove()
			}
		}.bind(this))
});
//购物车商品全选
$(document).on('click','.AllInputcheck',function(){
	console.dir($('.myInputchecked'))
	if(this.checked==true){
		$('.myInputchecked').prop('checked',true)
	}else{
		$('.myInputchecked').prop('checked',false)
	}
});
//购物车商品反选
$(document).on('click','.myInputchecked',function(){
	var myInputcheckLen=$(".myInputchecked").length;
	var checkedLen=$(".myInputchecked:checked").length;
	console.log(checkedLen)
	if(checkedLen==myInputcheckLen){
		$('.AllInputcheck').prop('checked',true);
	}else{
		$('.AllInputcheck').prop('checked',false);
	};
});

//点击商品图片和文字 跳转上商品详情页
$(document).on('click','.myshop-join',function(){
	 var detId=$(this).data("id");
     window.open("details.html?goods_id="+detId);
});
//跳转结算页
$('.goods-shop-push').click(function(){
	window.open('shopp-account.html')
});
