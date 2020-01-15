module.exports = {
    //获取当前页面对象
    getCurrentPage,
    showTips,
    /*显示提示弹窗*/
    setObjProperty,
    /*给对象的属性赋值, （数据无需处理直接赋值给对象）*/
    setObjPropertByValue,
    /*给index下标的对象的property属性赋value值，（将处理后的数据赋值给指定索引的对象）*/
    getElementValue,
    /*获取list列表的index下标的对象的element属性值*/
    
    getDataType,
    /*判断数据类型*/
    isNullReturn,
    /*判断是否为空，并返回值*/
    transData,
    /*将fields中的字段的值进行处理后重新返回结果集*/
    dateFtt,
    /*时间格式处理*/
    getApiPropertyVal,
    /*判断是否对象是否存在该属性，并返回属性的值*/
    getApiImg,
    /*获取图片地址*/
    getTimeRandom,
    /*获取时间字符串*/
    getIndex,
    /*获取数组的下标*/
    customerSet,
    /*去除数组中重复元素*/
    alert,
    /*弹窗测试*/
    getHasValObj, //获取有值的对象
    sortArray,                               //数组排序
    pxToRpx,                                 //px单位转换为rpx
    rpxToPx,                                 //rpx单位转换为px
    formatNumber,                            //格式化钱币
    throttle,                                //节流
    getErrors,                               //获取错误信息
    getValueByStr,                           //链式获取值
    isNotBlank,                              //判断是否不为空
    isNotBlankByStr,                         //根据属性字符串检测是否不为空
    isEmptyByStr,                            //根据属性字符串检测是否为空
    isEmpty,                                 //判断是否为空
    queryValueByStr,                         //检测对象是否满足搜索条件
    objToUrlParams,                          //将对象转为url传递参数
    copyProperties,                          //复制对象属性
    
}

//复制属性
function copyProperties(source, operator){
    if(operator instanceof Array){   //operatoer是数组，则根据属性进行赋值
        let item = {}
        for(let key in source){
            if(operator.indexOf(key) != -1){
                item[key] = source[key]
            }
        }
        return item
    }else{  //operatr是其他对象，就将原对象全部赋值(覆盖)给目标对象
        for(let key in source){
            operator[key] = source[key]
        }
        return operator
    }
}


//将对象转为url传递参数
function objToUrlParams(obj){
    let params = Object.values(obj).reduce((a, b, i) => b ? `${a}${Object.keys(obj)[i]}=${b}&` : `${a}`, '?');
    return params.substring(0, params.length - 1);
}

//检测对象是否满足搜索条件
function queryValueByStr(obj, properties, keyword){
    if (typeof (properties) == 'string') properties = properties.split(",")
    for(let i in properties){
        let value = getValueByStr(obj, properties[i])
        if(value.indexOf(keyword) != -1){
            return true
        }
    }
    return false
}


//根据属性字符串检测有没有值
function isNotBlankByStr(obj, str){
    return !isEmptyByStr(obj, str)
}

//根据属性字符串检测有没有值
function isEmptyByStr(obj, str){
    return isEmpty(getValueByStr(obj, str))
}


//根据字符串属性，递归出某对象的属性
function getValueByStr(obj, propertyArrStr, index){
    let propertyArr = propertyArrStr.split(".")
    index = index ? index : 0
    if (!obj || !obj.hasOwnProperty(propertyArr[index])) return ""     //当对象没有值时或者这个对象没有改属性时，直接返回null
    if (index >= propertyArr.length - 1) return obj[propertyArr[index]]  //当数组遍历完了之后，直接返回该对象值
    obj = obj[propertyArr[index]]
    index++
    return getValueByStr(obj, propertyArrStr, index)
}



//获取错误信息, 提示错误信息时用的
function getErrors(error) {
    return typeof (error) == 'object' ? JSON.stringify(error) : error
}


//节流，防止多次点击
function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }

    let _lastTime = null

    // 返回新的函数
    return function() {
        let _nowTime = +new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments) //将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
}



//格式化钱币
function formatNumber(str) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

//px单位转换为rpx
function pxToRpx(px) {
    var winWidth = wx.getSystemInfoSync().windowWidth
    return px * (750 / winWidth)
}

//rpx转换为px
function rpxToPx(rpx) {
    var winWidth = wx.getSystemInfoSync().windowWidth
    return rpx / (750 / winWidth)
}



//数组对象排序
function sortArray(sourceArr, sortArr, field) {
    let newArr = []
    for (let i in sortArr) {
        for (let j in sourceArr) {
            if (sortArr[i] == sourceArr[j][field]) {
                newArr.push(sourceArr[j])
                break
            }
        }
    }
    return newArr
}


//获取有值的对象
function getHasValObj(obj) {
    for (let key in obj) {
        if(isEmpty(obj[key])) delete obj[key]
    }
    return obj
}


/*获取当前页面对象*/
function getCurrentPage() {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    return currentPage
}

//弹窗测试
function alert(title) {
    wx.showToast({ title: title, duration: 2000 })
}

/*给对象的属性赋值, （数据无需处理直接赋值给对象）*/
function setObjProperty(currentObj, list, index, element, obj, property) { //list：列表；key是索引；element:元素;obj:对象名称；property对象的属性
    //let that = currentObj
    if (list[index].hasOwnProperty(element)) { //判断data对象是否存在该元素
        currentObj.setData({
            [obj + '[' + index + '].' + property]: list[index][element]
        })
    } else {
        currentObj.setData({
            [obj + '[' + index + '].' + property]: ''
        })
    }
}

/*给index下标的对象的property属性赋value值，（将处理后的数据赋值给指定索引的对象）*/
function setObjPropertByValue(currentObj, value, index, obj, property) {
    //let that = currentObj
    currentObj.setData({
        [obj + '[' + index + '].' + property]: value.toString()
    })
}

/*获取list列表的index下标的对象的element属性值*/
function getElementValue(list, index, element, isStr) { //没有isStr就默认返回整数
    if (isStr) {
        if (list[index].hasOwnProperty(element)) {
            return list[index][element]
        } else {
            return ""
        }
    } else {
        if (list[index].hasOwnProperty(element)) {
            return parseFloat(list[index][element])
        } else {
            return 0
        }
    }
}



// 判断是否是有值
function isNotBlank(data, ...vars) {
    return !isEmpty(data, ...vars)
}


/*判断是否为空*/
function isEmpty(data, ...vars) {
    if (vars.length == 0) return _isEmptyCore(data)
    return vars.some(item => { return _isEmptyCore(item) }) //当不定参数有一个为空就为空
}

function _isEmptyCore(data) {
    if (!data || data == 'undefined' || data == 'false' || data == 'null' || data == 'NaN' || data == "" || data == null || data == undefined ) {
        return true
    }
    if (typeof(data) == "object") { //判断对象/map
        if (JSON.stringify(data) == "{}" || JSON.stringify(data) == "[]") return true
    }
    return false
}

/*判断是数字还是字符串*/
function getDataType(data) {
    let numPattern = /^-?[1-9]+(\.\d+)?$|^-?0(\.\d+)?$|^-?[1-9]+[0-9]*(\.\d+)?$/ //判断是否是数字，包括小数或数字或负数
    return numPattern.test(data)
}

/*判断是否为空，并返回值*/
function isNullReturn(target, str) {
    if (target) {
        return target
    } else if (str) {
        return "无"
    } else {
        return ""
    }
}

//将fields中的字段的值进行处理后重新返回结果集
function transData(result, fields) {
    let res = []
    for (let index in result) {
        let temp = {}
        for (let fieldIndex in fields) {
            let field = fields[fieldIndex]
            temp[field] = isNullReturn(result[index][field])
        }
        res.push(temp)
    }
    return res
}


/*时间格式处理工具*/
function dateFtt(fmt, date) {
    var o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}




//判断对象是否存在该属性，并返回值
function getApiPropertyVal(property, obj, noneType) {
    if (obj.hasOwnProperty(property)) {
        if (!obj[property]) {
            if (noneType == "string") {
                return "无"
            } else if (noneType == "int") {
                return 0
            } else if (noneType == "0") {
                return 0
            } else if (noneType == "array") {
                return []
            }
            return ""
        }
        return obj[property]
    } else {
        if (noneType == "string") {
            return "无"
        } else if (noneType == "int") {
            return 0
        } else if (noneType == "0") {
            return 0
        } else if (noneType == "array") {
            return []
        }
        return ""
    }
}


//获取图片地址
function getApiImg(imgPath, imagePrefix, noImgPath) {
    if (!imgPath) {
        return noImgPath
    }
    if (imgPath.startsWith('http')) {
        return imgPath
    }
    if (!imagePrefix) {
        return noImgPath
    } else {
        return imagePrefix + imgPath
    }
    return imgPath
}

/*获取时间字符串*/
function getTimeRandom(type) {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let oneDate = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    if (!type) {
        return String(year) + String(month) + String(oneDate) + String(hour) + String(minute) + String(second)
    }
}


/*获取下标*/
function getIndex(element, arr) {
    for (let i in arr) {
        if (arr[i] == element) {
            return i
        }
    }
}


/*去除数组中重复元素*/
function customerSet(arr, property) {
    let tempSet = new Set()
    let result = []
    for (let i in arr) {
        tempSet.add(property ? arr[i][property] : arr[i])
    }
    return Array.from(tempSet)
}