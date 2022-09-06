const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const hitListButtonUp = document.querySelector('#add').addEventListener('click', hitListUp)
const hitListButtonDown = document.querySelector('#minus').addEventListener('click', hitListDown)
const editBtn = document.querySelectorAll('.edit')

const categories = document.querySelectorAll('.category')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

Array.from(categories).forEach(categoryBtn => {
    categoryBtn.addEventListener('click', updateCategory)
})

Array.from(editBtn).forEach((el)=>{
  el.addEventListener('click', editTodo)
})

async function editTodo(){
  const todoId = this.parentNode.dataset.id
  const currentTask = this.parentNode.dataset.todo
  const newName = window.prompt('Enter new task name:', currentTask)
  try {
    const response = await fetch('todos/edit', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'newName': newName
            })
        
    })
    location.reload()
  } catch(err) {
    console.error(err)
  }
}

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function updateCategory(e) {
    // console.log(this.parentNode)
    const userID = this.dataset.user
    // console.log(userID)
    // console.log(e)
    const category = e.target.innerText.toLowerCase()
    // console.log(category)
    try{
        const response = await fetch('todos/updateCategory', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'category': category,
                'userID': userID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.warn(err)
    }
}

async function hitListUp() {
    const userID = this.dataset.user
    try{
        const response = await fetch('hitList/hitListUp', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({

            })  
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function hitListDown() {
    const userID = this.dataset.user
    try{
        const response = await fetch('hitList/hitListDown', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({

            })  
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(data)
    }
}