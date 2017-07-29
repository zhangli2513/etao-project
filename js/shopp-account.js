//获取用户收货地址信息
function yhxx(){
	var url = "http://h6.duchengjiu.top/shop/api_useraddress.php";
    var parm = {token:localStorage.getItem("token")};
    $.get(url,parm,function (result) {
    	console.log(result.data);
    	result.data.forEach(function(obj){
    		
          var shoppSiteAdd=`
		      <div class='shoppSiteadd'>
			      <span>收件人:${obj.consignee}<span/>
			      <span>详细收货地址&nbsp:&nbsp${obj.province}(省/市)&nbsp${obj.city}(市/直辖区)&nbsp${obj.district}(县/区)&nbsp${obj.address}(镇/街道)&nbsp手机号码&nbsp:&nbsp${obj.mobile}<span/>
			      <button class='shoppSiteAddDel' data-id=${obj.address_id}>删除</button>
		      </div>
		    `;
		    $('.shopp-site-add').append(shoppSiteAdd)
    	})
    });
}
yhxx();	

//添加用户信息弹出页面
$('.shopp-site-join').click(function(){
	var loginContainer=$("<div class='loginContainer'></div>");
	var closeInput=$("<div class='headMY'><p class='headMyP1'>新增收货地址</p><p class='headMyP2'>关闭</p></div>")
	var usernameInput=`
	<div class='mySite'>
	    <p>收货地址:</p>
	   <div id="address" style="margin: 0px auto auto 80px;">
			<select class="select" id="province" name="province">
				<option value='' class="MYprovince">选择省份</option>
			</select>
			<select name="city" id="city">
				<option value='' class="MYcity">选择城市</option>
			</select>
			<select name="town" id="town">
				<option value="" class="MYdistrict">选择区域</option>
			</select>
	  </div>
	   <p class='mySite-me'>收货人&nbsp:&nbsp<input class='mySite-Name'/><p/>
	   <p class='mySite-me'>详细地址&nbsp:&nbsp<input class='mySite-Me'/><p/>
	   <p class='mySite-me'>电话号码&nbsp:&nbsp0000-<input class='PhoneCode'/><p/>
	   <p class='mySite-me'>手机号码&nbsp:&nbsp0000-<input class='cellPhone'/><p/>
	   <button class='addJoin'>保存新的地址</button>
	</div>
	`;
	loginContainer.append(closeInput)
	loginContainer.append(usernameInput);
	$(document.body).append(loginContainer);
	
	loginContainer.css({
		width:"700px",
		height:"500px",
		"background-color":"#E5E2E2",
		border:"3px solid #C1BDBD",
		position:"absolute",
		top:"50%",
		left:"50%",
		"box-sizing":"border-box",
		 margin:"-250px -350px"
	});
	$('.headMyP2').click(function(){
		loginContainer.slideUp(500,"swing",function(){
			loginContainer.remove();
		});
	});
//收货地址下拉列表选择	
	$("#address").selectAddress()
	$("#town").focusout(function(){
		var province = $("#province option:selected").html()
		var city = $("#city option:selected").html()
		var town = $("#town option:selected").html()
		if(province!= '选择省份' && city!="选择城市" && town!='选择区域'){
			console.log('省份/直辖市：'+province+'\n城市:'+city+'\n区/县：'+town)
		}
	});

//添加用户地址信息
	 
	$('.addJoin').click(function(){
		var addressName=$('.mySite-Me').val();
		var mySiteName=$('.mySite-Name').val();
		var MYprovince = $('#province').children('option:selected').val()
		var MYcity=$('#city').children('option:selected').val();
		var MYdistrict=$('#town').children('option:selected').val();
		var cellPhone=$('.cellPhone').val();
		var PhoneCode=$('.PhoneCode').val();
		var url = "http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token="+localStorage.getItem("token");
	    var parm = {address_name:addressName,consignee:mySiteName,country:'中国',province:MYprovince,city:MYcity,district:MYdistrict,address:addressName,zip_code:"邮政编码",mobile:cellPhone,email:"11@11.cn",tel:PhoneCode};
	    console.log(parm)
		    $.post(url,parm,function (result) {
		    	if(result.code==0){
			        loginContainer.slideUp(500,"swing",function(){
				     loginContainer.remove();
					});
					//点击保存新地址时获取用户收货地址信息刷新页面
					yhxx();	
		    	}
		    });
	});
});

//删除用户地址
$(document).on('click','.shoppSiteAddDel',function(){
	var delId=$(this).data('id')
	var url = "http://h6.duchengjiu.top/shop/api_useraddress.php";
    var parm = {status:"delete",address_id:delId};
    $.get(url+'?token='+localStorage.getItem("token"),parm,function (result) {
    	if(result.code==0){
          $(this).parent().parent().parent().remove();
    	}
    }.bind(this));
})

//查看购物车商品请求
 $.get(PRODUCT_HOST+CART,{token:localStorage.getItem('token')},function(result){
       console.log(result.data);
    var shopNum=localStorage.getItem('number');
    var details = '';
    result.data.forEach(function(obj){
    	details += `
        <div  class="shopping-header">
        	<div class="shop-jion myshop-join" data-id=${obj.goods_id}>
        		<img class="myheader-photo" src="${obj.goods_thumb}">
        		<p>${obj.goods_name}</p>
        	</div>
            <div class="header-box">
                <p>${obj.goods_number}</p>
            </div>
            <div class='shop-price myshop-price'>
                <p>￥<span class='minPrice'>${obj.goods_price}</span></p>
            </div>
            <div class='shop-price myshop-price'>
                <p><span class='BigPrice'>${obj.goods_price}</span>元</p>
            </div>
        </div>
        `;
    });
    $(".goods-container").html(details);
});