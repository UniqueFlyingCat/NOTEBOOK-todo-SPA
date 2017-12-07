var pushState = function(className) {
    // 切换地址栏信息
    // todo-new todo-list
    var pageName = className.split('-')[1]
    var url = 'todo_spa.html?page=' + pageName
    var state = {
        page: className,
    }
    history.pushState(state, 'title', url)
    // 手动设置 title
    document.title = pageName
}
var showPage = function(className) {
    var pages = es('.gua-page')
    for (var i = 0; i < pages.length; i++) {
        let page = pages[i]
        page.classList.add('gua-hide')
    }
    // 给 todo- 删掉 gua-hide
    var selector = '.' + className
    var todonewDiv = e(selector)
    todonewDiv.classList.remove('gua-hide')
    // 如果是 todolist 界面， 需要刷新
    if (className == 'todo-list') {
        showTodoList(className)
    }
    //如果是 todoEdit 界面， 需要刷新
    //并添加可编辑属性
    if (className == "todo-edit") {
        showTodoList(className)
        addOperate()
    }
}
var nowTime = function(z) {
    //返回 现在时间
        if (z === undefined) {
            z = new Date()
        }
        var x = z.toString()
        var zh = '天一二三四五六'
        var Year = x.slice(10, 15)
        var Month = z.getMonth() + 1
        var Day = x.slice(8, 10)
        var Hour = x.slice(16, 18)
        var Minute = x.slice(19, 21)
        var Second = x.slice(22, 24)
        var Week = zh[z.getDay()]
        if (String(Month).length === 1) {
            Month = '0' + Month
        }
        return `${Month}月${Day}日 ${Hour}时${Minute}分${Second}秒 星期${Week}`
    }
var bindEvents = function() {
    // 添加 todo 的事件
    bindEvent(e('#id-button-add'), 'click', function(){
        var input = e('#id-input-task')
        var task = input.value
        var todo = todoNew(task)
        saveTodo(todo)
    })

    //编辑,，删除，完成
    bindEvent(e('.todo-edit'), 'click', function(event){
        var target = event.target
        if (target.classList.contains('todo-button-edit')) {
            var span = target.parentElement.children[1]
            span.setAttribute('contenteditable', 'true')
            // span.contentEditable = true
            span.focus()
        }else if (target.classList.contains('todo-button-del')) {
            var span = target.parentElement
            var index = indexOfElement(event.target.parentElement)
            delTodo(span, index)
        }else if (target.classList.contains('todo-button-done')) {
            var span = target.parentElement
            toggleClass(span, 'doneStyle')
        }
    })
    //

    // 切换页面的 按钮
    bindAll('.gua-tab', 'click', function(event){
        var button = event.target
        var page = button.dataset.page
        showPage(page)
        // 改变 history.state
        pushState(page)
        // if (page == 'todo-new') {
        //     pageShowNew()
        // } else if (page == 'todo-list') {
        //     pageShowList()
        // }
    })

    // 文本框失去焦点后保存 todo
    bindEvent(e('.todo-edit'), 'focusout', function(event){
        var target = event.target
        log("1",event,"2",event.target)
        if (target.classList.contains('todo-label')) {
            // 让 span 不可编辑
            target.setAttribute('contenteditable', 'false')
            // 更新 todo
            var index = indexOfElement(target.parentElement)
            // 把元素在 todoList 中更新
            var todoList = loadTodos()
            todoList[index].task = target.innerHTML
            // todoList.splice(index, 1)
            saveTodos(todoList)
        }
    })

    //文本框输入 todo 按回车保存
    bindEvent(e('.todo-edit'), 'keydown', function(event){
        var target = event.target
        if(event.key === 'Enter') {
            // 失去焦点
            target.blur()
            // 阻止默认行为的发生, 也就是不插入回车
            event.preventDefault()
            // 更新 todo
            var index = indexOfElement(target.parentElement)
            // 把元素在 todoList 中更新
            var todoList = loadTodos()
            todoList[index].task = target.innerHTML
            // todoList.splice(index, 1)
            saveTodos(todoList)
        }
    })
    // 浏览器后退前进的时候要切换页面
    // 用户点击 前进 后退 按钮的时候, 会触发 window 的 popstate 事件
    // 于是可以在这里操作
    window.addEventListener("popstate", function(e) {
        var state = e.state;
        // state 就是 pushState 的第一个参数
        var pageName = state.page
        showPage(pageName)
        // pushState(pageName)
    })
}
var initApp = function() {
    // 根据地址栏的参数来显示不同的页面
    var query = location.search
    var [k, v] = query.slice(1).split('=')
    // 让 page 初始化为 list
    var page = 'list'
    // 设置一个 合法的 page 参数集合
    var validPages = ['list', 'new', "edit", "detail"]
    if (k == 'page') {
        if (validPages.includes(v)) {
            page = v
        }
    }
    // ["page", "list"]
    var pageName = 'todo-' + page
    showPage(pageName)
}
var __main = function() {
    bindEvents()
    // showTodoList()
    initApp()
}

__main()
