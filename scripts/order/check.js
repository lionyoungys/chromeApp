"use strict";
window.onload = function () {
    var param = core.paramToObject();
    UI.createCrumbs([
        ['订单处理', './manage.html'],
        ['待清洗', './willClean.html'],
        ['衣物检查', '#']
    ]);
    var token,data;
    core.storage.get('token',function (result) {
        token = result.token;
        core.post(api.getUrl('check'),{token:token,id:param.id},function (json) {
            var jsonData = core.jsonParse(json);
            data = jsonData.data;
            dataView(data);
            console.log(jsonData);
        })
    })

    function dataView(data) {
        var len = data.length;
        if (len < 1) return false;
        var tempNode, tempLen, j, colorEditor = [],questionEditor = [],imgNode = [], node = [];
        for (var i = 0;i < len;++i) {
            tempNode = node[i] = UI.createNodes('div',14);
            //主容器节点
            tempNode[0].className = 'container';
            //标题节点
            tempNode[1].className = 'clearfix bg-container';    //标题背景节点
            tempNode[0].appendChild(tempNode[1]);
            tempNode[2].className = 'left';    //左侧标题节点
            tempNode[2].innerText = data[i].g_name;
            tempNode[1].appendChild(tempNode[2]);
            tempNode[3].className = 'right';    //右侧数量节点
            tempNode[3].innerHTML = '数量：×<span>'+data[i].number+'</span>';
            //照片容器节点
            tempNode[4].className = 'flex-container';
            tempNode[0].appendChild(tempNode[4]);
            //照片提示节点
            tempNode[5].className = 'flex-item';
            tempNode[5].innerText = '上传照片:';
            tempNode[4].appendChild(tempNode[5]);
            //照片节点
            tempLen = data[i].img.length;
            if (tempLen > 0) {
                imgNode[i] = [];
                for (j = 0;j < tempLen;++j) {
                    imgNode[i][j] = core.e('img');
                    core.getImage(api.host + data[i].img[j],imgNode[i][j]);
                }
            }
            //照片上传节点
            tempNode[6].className = 'flex-item upload-img';
            tempNode[4].appendChild(tempNode[6]);
            if (tempLen >= 11) {    //判断图片是否已到添加限制，如果是，则隐藏添加操作
                tempNode[6].style.display = 'none';
            }
            //提示照片数量限制节点
            tempNode[7].className = 'flex-item flex-item-last';
            tempNode[7].innerHTML = '<div class="text-bottom">（上传照片不得超过11张）</div>';
            tempNode[4].appendChild(tempNode[7]);
            //颜色容器节点
            tempNode[8].className = 'page-info';
            tempNode[0].appendChild(tempNode[8]);
            //颜色提示节点
            tempNode[9].innerText = '颜色:';
            tempNode[8].appendChild(tempNode[9]);
            //颜色数据节点
            tempNode[10].innerText = data[i].color;
            tempNode[8].appendChild(tempNode[10]);
            //问题容器节点
            tempNode[11].className = 'page-info';
            tempNode[0].appendChild(tempNode[11]);
            //问题提示节点
            tempNode[12].innerText = '问题描述:';
            tempNode[11].appendChild(tempNode[12]);
            //问题数据节点
            tempNode[13].innerText = data[i].item_note;
            tempNode[11].appendChild(tempNode[13]);
            //颜色编辑及问题编辑按钮节点
            colorEditor[i] = core.e('input');
            tempNode[8].appendChild(colorEditor[i]);
            questionEditor[i] = core.e('input');
            tempNode[11].appendChild(questionEditor[i]);
            colorEditor[i].setAttribute('type','button');
            colorEditor[i].setAttribute('data-id',data[i].id);
            colorEditor[i].setAttribute('data-type','color');
            questionEditor[i].setAttribute('data-id',data[i].id);
            questionEditor[i].setAttribute('data-type','question');
            questionEditor[i].setAttribute('type','button');
            colorEditor[i].className = questionEditor[i].className = 'btn btn-editor';
            colorEditor[i].value = questionEditor[i].value = '编辑';
            core.byId('body').appendChild(tempNode[0]);
        }
        /*<section class="container">
         <div class="clearfix bg-container">
         <div class="left">羊毛衬衫(干洗)</div>
         <div class="right">数量：×<span>1</span></div>
         </div>

         <section class="flex-container">
         <div class="flex-item">上传照片&nbsp;:</div>
         <div class="flex-item"><em class="upload-img-delete"></em></div>
         <div class="flex-item upload-img"></div>
         <div class="flex-item flex-item-last"><div class="text-bottom">（上传照片不得超过11张）</div></div>
         </section>


         <section class="page-info">
         <div>颜色&nbsp;:</div><div>白条蓝，彩虹</div>
         <input type="button" value="编辑" class="btn btn-editor">
         </section>
         <section class="page-info">
         <div>问题描述&nbsp;:</div><div>大片污渍，不堪入目</div>
         <input type="button" value="编辑" class="btn btn-editor">
         </section>
         </section>*/
    }
}