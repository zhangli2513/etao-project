(function(){
//主页商品列表
	function GoodItem(obj) {
        this.des = obj;
        var space = 20;
        var colume = 5;
        var width = (1200-space*(colume-1))/colume;
        
        this.item = $("<div class='good-box' data-id='"+obj.goods_id+"'></div>");
        var name = $("<p class='good-name'>"+obj.goods_name+"</p>");
        var other = $("<p><img width='"+width+"px' src='"+obj.goods_thumb
                    +"' alt=''></p><h3 class='goods-price'>￥"+obj.price+"</h3><p class='goods-desc'>"+obj.goods_desc
                    +"</p>");
        this.item.append(name);
        this.item.append(other);
        this.item.css({
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
        name.css({
            position: "absolute",
            height: "20px",
            "line-height": "20px",
            display: "none"
        });
        this.item.hover(function () {
            $(this).children().css("display","block");
        },function () {
            $(".good-name").css("display","none");
        });
    }
	GoodItem.prototype.click=function(callback){
		this.item.on("click",this,callback);
		return this;
	}
	function Good(url,parm,superView,action){
		this.loadData(url,parm,superView,action);
		this.goodDetail(url);
	};
	Good.prototype.loadData=function(url,parm,superView,action){
		$.get(url,parm,function(result){
//			console.log(result)
			if(result.code==0){
				this.showGoodsView(result.data,superView,action)
			}
		}.bind(this));
	};
	Good.prototype.showGoodsView=function(Goods,superView,action){
		Goods.forEach(function(data){
		     console.log(data)
			superView.append(new GoodItem(data).click(action).item);
		});
	};
	//商品详情跳转
    Good.prototype.goodDetail = function (url) {
        $(document).on('click','.good-box',function () {
            var detId=$(this).data("id");
            window.open("details.html?goods_id="+detId);
            // console.log(detId);
        });
    }
	window.Good=Good;
})();
