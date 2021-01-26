window.addEventListener('load',function(){
    // 指向tab实例对象的变量
    var that;
    class Tab {
        constructor(id){
            // 指向实例对象
            that = this;
            // 获取元素
            this.tab = document.querySelector(id);

            this.add = this.tab.querySelector('.addtab');
            // li的父元素
            this.ul = this.tab.querySelector('.firstnav ul:first-child');
            // section的父元素
            this.body = this.tab.querySelector('.body');
            this.init();
        }
        init() {
            // init 初始化操作让相关的元素绑定事件
            this.updateDOM();
            // 添加按钮绑定点击事件
            this.add.addEventListener('click',this.addTab);
            // 标签绑定点击事件
            for(var i = 0;i<this.lis.length;i++){
                this.lis[i].index = i;
                this.lis[i].addEventListener('click',this.toggleTab);
                this.close[i].addEventListener('click',this.delTab);
                this.spans[i].addEventListener('dblclick',this.editTab);
                this.sections[i].addEventListener('dblclick',this.editTab);

            }
            
        }
        // 1.切换功能
        toggleTab() {
            // 清楚当前类
            that.clearClass();
            this.className = 'liactive';
            that.sections[this.index].className = 'tabactive';
            
        };
        // 清楚当前类
        clearClass() {
            for(var i=0;i<this.lis.length;i++){
                that.lis[i].className = '';
                that.sections[i].className = '';
            }
        };
        // 更新元素
        updateDOM() {
            this.lis = this.tab.querySelectorAll('li');
            this.sections = this.tab.querySelectorAll('section');
            this.close = this.tab.querySelectorAll('.close');
            this.spans = this.tab.querySelectorAll('.firstnav li span:first-child');
        }
        // 2.添加功能
        addTab() {
            that.clearClass();
            //(1)创建li元素和section元素
            var li = '<li class="liactive"><span>新选项</span><span class="close">x</span></li>';
            var sec = '<section class="tabactive">测试二</section>'
            //(2)将两个元素追加到对应的父元素里面
            that.ul.insertAdjacentHTML('beforeend',li);
            that.body.insertAdjacentHTML('beforeend',sec);
            that.init();
        };
        // 3.删除功能
        delTab(e) {
            // 阻止事件冒泡，防止出发li的点击切换事件
            e.stopPropagation();
            var index = this.parentNode.index;
            console.log(index);
            // 根据索引号删除对应的li和section
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            // 当我们删除的不是选中状态的li时，原来选中状态li保持不变
            if(document.querySelector('.liactive')) return;
            index--;
            // index>0 ? that.lis[index].click(): that.lis[0].click();
            // 手动调用点击事件  不需要鼠标触发
            that.lis[index] &&  that.lis[index].click();
        };
        // 4.修改功能
        editTab() {
            // 获取原标签里的内容
            var str = this.innerHTML;
            // 双击禁止选定文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            console.log(this);
            // 创建文本框元素
            this.innerHTML = '<input type="text" />';
            // 获取文本框对象
            var input = this.children[0];
            input.value = str;
            input.select();//文本框里面的文字处于选定状态
            // 元素失去焦点事件
            input.addEventListener('blur',function(){
                var val = this.value;
                this.parentNode.innerHTML = val;
            })
            // 按下回车键时触发失去焦点事件
            input.addEventListener('keyup',function(e){
                if(e.keyCode===13){
                    // 手动调用表单失去焦点事件， 不需要鼠标离开操作
                    this.blur();
                }
            })
        };
    }
    new Tab('#tab');
})