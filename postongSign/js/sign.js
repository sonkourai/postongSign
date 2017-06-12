function getSign() {
	var sign = '';
	var target = '';
	var hash = null;
	var input = $('textarea.in').val();
	if(input) {
		var json = JSON.parse(input);
		if(json) {
			var sdic = Object.keys(json).sort();
			for(var k in sdic) {
				if(sdic[k]=='goods' && json[sdic[k]]) {					
					target += '&goods=[';
					for (var g in json.goods){
						var good = json.goods[g];
						var ssdic = Object.keys(good);
						target += '{';
						for(var kk in ssdic) {
							target += '"' + ssdic[kk] + '":"' + good[ssdic[kk]] + '",';
						}
						target = target.slice(0, target.length-1);
						target += '}';
						target += ',';
					}
					target = target.slice(0, target.length-1);
					target += ']';
					
				} else if(sdic[k]!='sign' && json[sdic[k]]) {
					target += '&'+sdic[k]+'='+JSON.stringify(json[sdic[k]]).replace(/"/g,'');
				}
			}
			if(target.length > 1) {
				var key = $('.key').val();
				if(key) {
					target = target.slice(1) + key;
					hash = md5(target).toUpperCase();
				}
				else {
					alert("请输入MD5密钥！")
				}
			}
		}
	}
	if(hash) {
		$('textarea.out').val("待签名字符串:\n"+target+"\n\n\n签名结果:\n"+hash);
	}
}