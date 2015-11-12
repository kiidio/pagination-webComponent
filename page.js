//分页插件
/**
 2015-11-12 kiidio
 **/
(function ($) {

    var ms = {
        init: function (obj, args) {
            return (function () {
                ms.fillHtml(obj, args);
                ms.bindEvent(obj, args);
            })();
        },
        //填充html
        fillHtml: function (obj, args) {
            return (function () {
                var n = Math.floor((args.pageCount - 1) / 8);
                var cycleCount = 0;//计数标志
                obj.empty();
                obj.append('<ul id="pageList"></ul>');
                var container = $('#pageList')
                //上一页
                if (args.current > 1) {
                    container.append(' <li id="prepage" ><a  href="#"><</a></li>');
                } else {
                    container.remove('#prepage');
                    container.append('<li  ><span class="disable"  href="#"><</span></li>');
                }
                //中间页码
                if (args.pageCount <= 8) {
                    for (var i = 1; i < args.pageCount+1; i++) {
                        
                        if (i == args.current) {
                            container.append('<li><a href="#" class="j-pgItem current">' + i + '</a></li>');

                        }
                        else {
                            container.append('<li><a href="#" class="j-pgItem">' + i + '</a></li>');
                        }


                    }

                    

                }

                else {


                    if( (args.pageCount-args.current) <= 8){
                        
                        for(var i=args.pageCount-8;i<args.pageCount+1;i++){
                             if (i == args.current) {
                                    container.append('<li><a href="#" class="j-pgItem current">' + i + '</a></li>');

                                }
                                else {
                                    container.append('<li><a href="#" class="j-pgItem">' + i + '</a></li>');
                                }
                        }
                         

                    }

                    else{
                        
                        for (var j = 0; j < n+1; j++) {
                        if (j * 8 >= args.current) {
                            cycleCount = j * 8;
                            

                            for (var k = cycleCount - 7; k < cycleCount + 1; k++) {

                                if (k == args.current) {
                                    container.append('<li><a href="#" class="j-pgItem current">' + k + '</a></li>');

                                }
                                else {
                                    container.append('<li><a href="#" class="j-pgItem">' + k + '</a></li>');
                                }
                            }

                             break;


                        }



                    }



                    container.append('<li class="ellipsis"></li> <li> <a href="#" class="j-pgItem lastpage">' + args.pageCount + '</a></li>');
               }


                }


                //下一页
                if (args.current < args.pageCount) {
                    container.append(' <li id="nextpage"><a  href="#">></a></li>');
                } else {
                    container.remove('#nextpage');
                    $('.lastpage').addClass('current')
                    container.append('<li ><span class="disable" >></span></li>');

                }

                obj.append('<div class="clr"></div>');//用于清除浮动


            })();
        },
        //绑定事件
        bindEvent: function (obj, args) {
            return (function () {
                obj.on("click", "a.j-pgItem", function () {
                    var current = parseInt($(this).text());
                    ms.fillHtml(obj, {"current": current, "pageCount": args.pageCount});
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current);
                    }
                });
                //上一页
                obj.on("click", "#prepage", function () {
                    var current = parseInt($('#pageList li').children('.current').text());
                    ms.fillHtml(obj, {"current": current - 1, "pageCount": args.pageCount});
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current - 1);
                    }
                });
                //下一页
                obj.on("click", "#nextpage", function () {
                    var current = parseInt($('#pageList li').children('.current').text());
                    ms.fillHtml(obj, {"current": current + 1, "pageCount": args.pageCount});
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current + 1);
                    }
                });
            })();
        }
    }
    $.fn.createPage = function (options) {
        var args = $.extend({
            pageCount: 40,
            current: 1,
            backFn: function () {
            }
        }, options);
        ms.init(this, args);
    }
})(jQuery);

