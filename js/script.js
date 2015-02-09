window.onload=function(){
	waterfall('main','box');
	//虚拟Json数据
	var dataInt = {"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'}]};

	window.onscroll = function(){
		if(checkScrollSlide){
			var oParent = document.getElementById('main');
			//将数据渲染到页面的尾部
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src="image/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			//新添加到尾部的元素也要调用瀑布流函数，才能像瀑布流那样进行排列
			waterfall('main','box');
		}
	}
}

function waterfall(parents,box){
	//将main下的所有class为box的元素取出来
	var oParent = document.getElementById(parents);
	var oBoxs = getByClass(oParent,box);
	console.log(oBoxs.length);
	//计算整个页面显示的列数( 页面宽/box的宽)
	var oBoxW = oBoxs[0].offsetWidth;
	console.log(oBoxW);
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	console.log(cols);
	//设置main的宽
	oParent.style.cssText='width:' + oBoxW*cols + 'px;margin:0 auto';
	var hArr=[];//存放每一列高度的数组
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			console.log(minH);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			// oBoxs[i].style.left = oBoxW*index + 'px'; 其中一种实现方法  让第二行的图片对准最矮的那张图片
			//另外一种做法
			oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
	console.log(hArr);
}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array(), //用来存储获取到的所有class为box的元素
	oElements = parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

//获得高度最低的那个下标索引
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
}

//检测是否具备了滚动加载数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	//混杂模式和标准模式(兼容写法)
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var height = document.body.clientHeight||document.documentElement.clientHeight;
	console.log(height);
	return (lastBoxH<scrollTop+height)?true:false;
}