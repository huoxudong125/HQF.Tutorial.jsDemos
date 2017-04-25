function PullToRefreshMultiTab(tabContentTag) {


    this.myScroll = null;
    this.pullDownEl = null;
    this.pullDownL = null;
    this.pullUpEl = null;
    this.pullUp = null;
    this.downCount = 0;
    this.upCount = 0;
    this.loadingStep = 0; //加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新  



    this.pullDownAction = function (tabContentTag) { //下拉事件  
        setTimeout(function () {
            var el, li, i;
            el = $(tabContentTag + ' ul');
            for (i = 0; i < 3; i++) {
                li = $("<li></li>");
                this.downCount++;
                li.text('new Add ' + this.downCount + " ！");
                el.prepend(li);
            }
            this.pullDownEl.removeClass('loading');
            this.pullDownL.html('下拉显示更多...');
            this.pullDownEl['class'] = this.pullDownEl.attr('class');
            this.pullDownEl.attr('class', '').hide();
            this.myScroll.refresh();
            this.loadingStep = 0;
        }, 1000); //1秒  
    }

    this.pullUpAction = function (tabContentTag) { //上拉事件  
        setTimeout(function () {
            var el, li, i;
            el = $(tabContentTag + ' ul');
            for (i = 0; i < 3; i++) {
                li = $("<li></li>");
                this.upCount++;
                li.text('new Add ' + this.upCount + " ！");
                el.append(li);
            }
            this.pullUpEl.removeClass('loading');
            this.pullUpL.html('上拉显示更多...');
            this.pullUpEl['class'] = this.pullUpEl.attr('class');
            this.pullUpEl.attr('class', '').hide();
            this.myScroll.refresh();
            this.loadingStep = 0;
        }, 1000);
    }

    this.loaded = function (tabContentTag) {
        this.pullDownEl = $(tabContentTag + ' .pullDown');
        this.pullDownL = this.pullDownEl.find('.pullDownLabel');
        this.pullDownEl['class'] = this.pullDownEl.attr('class');
        this.pullDownEl.attr('class', '').hide();

        this.pullUpEl = $(tabContentTag + ' .pullUp');
        this.pullUpL = this.pullUpEl.find('.pullUpLabel');
        this.pullUpEl['class'] = this.pullUpEl.attr('class');
        this.pullUpEl.attr('class', '').hide();

        this.myScroll = new IScroll(tabContentTag, {
            probeType: 2, //probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。  
            scrollbars: true, //有滚动条  
            mouseWheel: true, //允许滑轮滚动  
            fadeScrollbars: true, //滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
            bounce: true, //边界反弹  
            interactiveScrollbars: true, //滚动条可以拖动  
            shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
            click: true, // 允许点击事件  
            keyBindings: true, //允许使用按键控制  
            momentum: true // 允许有惯性滑动  
        });
        //滚动时  
        this.myScroll.on('scroll', function (me) {
            console.info("scroll event. this.y: " + this.y);
            if (me.loadingStep == 0 &&
                !me.pullDownEl.attr('class').match('flip|loading') &&
                !me.pullUpEl.attr('class').match('flip|loading')) {
                if (arguments.callee.y > 5) {
                    //下拉刷新效果  
                    me.pullDownEl.attr('class', me.pullUpEl['class'])
                    me.pullDownEl.show();
                    me.myScroll.refresh();
                    me.pullDownEl.addClass('flip');
                    me.pullDownL.html('准备刷新...');
                    me.loadingStep = 1;
                } else if (this.y < (this.maxScrollY - 5)) {
                    //上拉刷新效果  
                    me.pullUpEl.attr('class', me.pullUpEl['class'])
                    me.pullUpEl.show();
                    me.myScroll.refresh();
                    me.pullUpEl.addClass('flip');
                    me.pullUpL.html('准备刷新...');
                    me.loadingStep = 1;
                }
            }
        }(this));
        //滚动完毕  
        this.myScroll.on('scrollEnd', function (me) {
            console.info("scroll end event.");
            if (me.loadingStep == 1) {
                if (me.pullUpEl.attr('class').match('flip|loading')) {
                    me.pullUpEl.removeClass('flip').addClass('loading');
                    me.pullUpL.html('Loading...');
                    me.loadingStep = 2;
                    me.pullUpAction(tabContentTag);
                } else if (me.pullDownEl.attr('class').match('flip|loading')) {
                    me.pullDownEl.removeClass('flip').addClass('loading');
                    me.pullDownL.html('Loading...');
                    me.loadingStep = 2;
                    me.pullDownAction(tabContentTag);
                }
            }
        }(this));
    }

    this.loaded(tabContentTag);
};