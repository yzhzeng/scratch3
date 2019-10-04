function ZanShang(){
  this.popbg = $('.zs-modal-bg');
  this.popcon = $('.zs-modal-box');
  this.closeBtn = $('.zs-modal-box .close');
  this.zsbtn = $('.zs-modal-btns .btn');
  this.zsPay = $('.zs-modal-pay');
  this.zsBtns = $('.zs-modal-btns');
  this.zsFooter = $('.zs-modal-footer');
  var that = this;
  $('.show-zs').on('click',function(){
    //点击赞赏按钮出现弹窗
    that._show();
    that._init();
  })
}
ZanShang.prototype._hide = function(){
  this.popbg.hide();
  this.popcon.hide();
}
ZanShang.prototype._show = function(){
  this.popbg.show();
  this.popcon.show();
  this.zsBtns.show();
  this.zsFooter.show();
  this.zsPay.hide();
}
ZanShang.prototype._init = function(){
  var that = this;
  this.closeBtn.on('click',function(){
    that._hide();
  })
  this.popbg.on('click',function(){
    that._hide();
  })
  this.zsbtn.each(function(el){
    $(this).on('click',function(){
      var num = $(this).attr('data-num'); //按钮的对应的数字
      var type = $('.zs-type:radio:checked').val();//付款方式
      //根据不同付款方式和选择对应的按钮的数字来生成对应的二维码图片，你可以自定义这个图片的路径，默认放在当前images目录中
      //假如你需要加一个远程路径，比如我的就是
      //http://caibaojian.com/wp-content/themes/blue/images/pay/'+type+'-'+num+'.png';
      var src = '/blog/public/images/'+type+'-'+num+'.png';
      var text = $(this).html();
      var payType=$('#pay-type'), payImage = $('#pay-image'),payText = $('#pay-text'),payMode = $('#pay-mode');
      if(type=='alipay'){
        payType.html('支付宝');
        payMode.html('扫描二维码完成支付');
      }else{
        payType.html('微信');
	  if(/micromessenger/.test(navigator.userAgent.toLowerCase())){
	      payMode.html('长按二维码完成支付');
        }
      }
      payImage.attr('src',src);
      payText.html('￥'+ num + '元');
      that.zsPay.show();
      that.zsBtns.hide();
      that.zsFooter.hide();
      if(type=='alipay' && !/micromessenger/.test(navigator.userAgent.toLowerCase())){
          switch(num){
               case '1':
                    $(location).attr('href','HTTPS://QR.ALIPAY.COM/FKX02417ZECAEDN39FF9F0');
                    break;
               case '2':
                    $(location).attr('href','HTTPS://QR.ALIPAY.COM/FKX02935S6PILYA5JPSZ96');
                    break;
               case '3':
                    $(location).attr('href','HTTPS://QR.ALIPAY.COM/FKX06003FL92QDAKBBJXFC');
                    break;
               case '5':
                    $(location).attr('href','HTTPS://QR.ALIPAY.COM/FKX05755YRLMRPN4UYQ54D');
                    break;
               case '10':
                    $(location).attr('href','HTTPS://QR.ALIPAY.COM/FKX0000068BFG7X8OS10B2');
                    break;
               case 'n':
                    $(location).attr('href','HTTPS://QR.ALIPAY.COM/FKX03035ISO2COAFADZID4');
                    break;
               default:
                    $(location).attr('href','HTTPS://QR.ALIPAY.COM/FKX03035ISO2COAFADZID4');
                    break;
          }
      }
    })
  })
}
var zs = new ZanShang();
