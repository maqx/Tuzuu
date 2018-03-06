/**
 * Created by ml620 on 2016/12/2 0002.
 */
//设置日历的开始结束时间
function set_time(start_pikaday,_start_time,end_pikaday,_end_time) {
	start_pikaday.setDate(_start_time);
	end_pikaday.setDate(_end_time);
}
//根据val获取开始和结束时间
function get_time(val) {
	var _start_time,_end_time,date = new Date();
	switch(val){
		case 'Today':
			_end_time = _start_time = date;
			break;
		case 'Yesterday':
			_end_time = _start_time = new Date(date.setDate(date.getDate()-1));
			break;
		case 'Week':
			_end_time = new Date();
			_start_time = new Date(date.setDate(date.getDate()-7));
			break;
		case 'Month':
			_end_time = new Date();
			_start_time = new Date(date.setDate(date.getDate()-30));
			break;
		case 'thisMonth':
			_end_time = new Date();
			_start_time = new Date(date.getFullYear(),date.getMonth(),1);
			break;
		case 'prevMonth':
			var year=date.getFullYear(),month = date.getMonth()-1;
			if(month<0){
				year = year - 1;
				month = 11;
			}
			_start_time = new Date(year,month,1);
			_end_time = new Date(year,month+1,0);
			break;
		case 'all':
			_end_time = new Date();
			_start_time = new Date(2016,0,1);
			break;
	}
	return {'start_time':_start_time,'end_time':_end_time};
}
//获取location.href上面的数据
function get_href_para(para){
	var reg = new RegExp("(^|&)"+para +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null){
		return decodeURI(r[2]);
	}
	return "";
}

//json格式拼接为url参数
function parseParam(param, key){
	var paramStr="";
	if(param instanceof String||param instanceof Number||param instanceof Boolean){
		paramStr+="&"+key+"="+encodeURIComponent(param);
	}else{
		$.each(param,function(i){
			var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
			paramStr+='&'+parseParam(this, k);
		});
	}
	return paramStr.substr(1);
};

//条件删除li
function removeAfter(data,index) {
	for(var i =0;i<data.length;i++){
		if (i>index){
			data.eq(i).remove()
		}
	}
}

/**
 * 小数保留
 * */
function myNumberic(e,len) {
	var obj=e.srcElement || e.target;
	var dot=obj.value.indexOf(".");//alert(e.which);
	len =(typeof(len)=="undefined")?2:len;
	var  key=e.keyCode|| e.which;
	if(key==8 || key==9 || key==46 || (key>=37  && key<=40))//这里为了兼容Firefox的backspace,tab,del,方向键
		return true;
	if (key<=57 && key>=48) { //数字
		if(dot==-1)//没有小数点
			return true;
		else if(obj.value.length<=dot+len)//小数位数
			return true;
	} else if((key==46) && dot==-1){//小数点
		return true;
	}
	return false;
}

$('body').delegate('input[type=button]','click',function () {
	var $this = $(this);
	$this.attr('disabled','disabled');
	setTimeout(function () {
		$this.removeAttr("disabled");
	},2000)
})
