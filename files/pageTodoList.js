var todoTemplate = function(todo) {
    var time = todo.time
    var task = todo.task
    var t = `
        <div class="panel panel-info">
            <div class="panel-heading">
                <span class="element time" contenteditable="false">${time}</span>
            </div>
            <div class="panel-body todo-cell">
                <h3 class="panel-title"><span class='todo-label element' contenteditable='false'>${task}</span></h3>
            </div>
        </div>
    `
    return t
}

// <div class="todo-cell">
//     <span class='todo-label element' contenteditable='false'>${task}</span>
//     <span class="element time" contenteditable="false">${time}</span>
// </div>




var insertTodoList = function(todoList, className) {
    var selector = "." + className
    var todoListDiv = e(selector)
    // 清空现有的所有 todo
    todoListDiv.innerHTML = ''
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        var t = todoTemplate(todo)
        appendHtml(todoListDiv, t)
    }
}

// 加载所有 todo 并且显示在界面上
var showTodoList = function(className) {
    var todoList = loadTodos()
    insertTodoList(todoList, className)
}
