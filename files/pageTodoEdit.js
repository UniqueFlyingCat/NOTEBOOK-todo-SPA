var editButton =function () {
    var h =`
    <button class="todo-button-edit todo-button"  type="button">编辑</button>
    <button class="todo-button-done todo-button" type="button"">完成</button>
    <button class="todo-button-del todo-button"  type="button"" >删除</button>
    `
    return h
}
var addOperate = function () {
    var todoEditDiv = es(".todo-cell")
    for (var i = 0; i < todoEditDiv.length; i++) {
        var todo = todoEditDiv[i]
        // todo.setAttribute("contenteditable", "true")
        var t = editButton()
        appendHtml(todo, t)
    }
}
// 返回自己在父元素中的下标
var indexOfElement = function(element) {
    var parent = element.parentElement
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i]
        if (e === element) {
            return i
        }
    }
}

//删除点击的todo并保存
var delTodo = function(span, index) {
    span.remove()
    var todoList = loadTodos()
    todoList.splice(index, 1)
    saveTodos(todoList)
}
