var intValueOfGoods = [];//['goodsId', 'price', 'quantity'];
function getSignFromJson() {
	var sign = '';
	var target = '';
	var hash = null;
	var input = $('textarea.in-json').val();
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
							var v = good[ssdic[kk]];
							if(intValueOfGoods.indexOf(ssdic[kk]) === -1) {
								target += '"' + ssdic[kk] + '":"' + v + '",';
							}
							else {
								target += '"' + ssdic[kk] + '":' + v + ',';
							}
							
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
				var key = $('.key-json').val();
				if(key) {
					target = target.slice(1) + key;
					hash = md5(target).toUpperCase();
				}
				else {
					alert("请输入MD5密钥！否则使用默认密钥：fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR");
					$('.key-json').val('fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR');
					key = $('.key-json').val();
					target = target.slice(1) + key;
					hash = md5(target).toUpperCase();
				}
			}
		}
	}
	if(hash) {
		$('textarea.out-json').val("待签名字符串:\n"+target+"\n\n\n签名结果:\n"+hash);
	}
}

function getSignFromLink() {
	var sign = '';
	var target = '';
	var hash = null;
	var input = $('textarea.in-link').val();
	if(input) {
		var p = input.split('?')[1]
		if(p == undefined || !p) {
			return
		}
		var param = p.split('&');
		var json = {}
		for(var kv in param) {
			var k = param[kv].split('=')[0];
			var v = param[kv].split('=')[1];
			v = decodeURIComponent(v);
			v = v.replace('+',' ')
			json[k] = v;
		}
		if(json['goods']) {
			json['goods'] = JSON.parse(json['goods']);
		}

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
							var v = good[ssdic[kk]];
							if(intValueOfGoods.indexOf(ssdic[kk]) === -1) {
								target += '"' + ssdic[kk] + '":"' + v + '",';
							}
							else {
								target += '"' + ssdic[kk] + '":' + v + ',';
							}
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
				var key = $('.key-link').val();
				if(key) {
					target = target.slice(1) + key;
					hash = md5(target).toUpperCase();
				}
				else {
					alert("请输入MD5密钥！否则使用默认密钥：fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR");
					$('.key-link').val('fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR');
					key = $('.key-link').val();
					target = target.slice(1) + key;
					hash = md5(target).toUpperCase();
				}
			}
		}
	}
	if(hash) {
		$('textarea.out-link').val("待签名字符串:\n"+target+"\n\n\n签名结果:\n"+hash);
	}
}