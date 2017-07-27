var myInputFirst='';
$(".header-search-content").find("input:first").keyup(function(){
	myInputFirst=$(".header-search-content").find("input:first").val();
	localStorage.setItem("myInputFirst",myInputFirst);
});

$(".header-search-content").find("input:last").click(function(){
	window.open("seeks.html")
});
$.get(PRODUCT_HOST+GOODS,{search_text:localStorage.getItem('myInputFirst')},function(result){
	console.log(result)
	var goodBox='';
	result.data.forEach(function(obj){
        var space = 20;
        var colume = 5;
        var width = (1200-space*(colume-1))/colume;
       
        /*goodBox = $("<div class='good-box' data-id='"+obj.goods_id+"'></div>");
        var name = $("<p class='good-name'>"+obj.goods_name+"</p>");
        var other = $("<p><img width='"+width+"px' src='"+obj.goods_thumb
                    +"' alt=''></p><h3 class='goods-price'>￥"+obj.price+"</h3><p class='goods-desc'>"+obj.goods_desc
                    +"</p>");        
        goodBox.append(name);
        goodBox.append(other);*/
        
        goodBox +=`
        	<div class='good-box' data-id='${obj.goods_id}'>
        		<p class='good-name'>${obj.goods_name}</p>
        		<p>
        			<img width='${width}px' src='${obj.goods_thumb}' alt=''>
        		</p>
        		<h3 class='goods-price'>￥${obj.price}</h3>
        		<p class='goods-desc'>${obj.goods_desc}</p>
        	</div>
        `;
        $(".goods-container").html(goodBox);
        $('.good-box').css({
            width:width+"px",
            height:"384px",
            border:"2px #ff4411 solid",
            "box-sizing": "border-box",
            float:"left",
            overflow: "hidden",
            position: "relative",
            "margin-left":"13px",
            "margin-top":"13px"
        });
        $('.good-name').css({
            position: "absolute",
            height: "20px",
            "line-height": "20px",
            display: "none"
        });
        $('.good-box').hover(function () {
            $(this).children().css("display","block");
        },function () {
            $(".good-name").css("display","none");
        });
	});
});
$(document).on('click','.good-box',function () {
        var detId=$(this).data("id");
        window.open("details.html?goods_id="+detId);
        // console.log(detId);
});
