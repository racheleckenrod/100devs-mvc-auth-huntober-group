const Todo = require('../models/Todo')
const User = require('../models/User')
const HitList = require('../models/hitlist')
const hitListController = require('./hitList')
const TodoTask = require('../models/Todo')

// Create Hitlist function from hitList.js controller
const createHitList = hitListController.createHitList



module.exports = {
    populateDefault: async (req, res) =>{
        const defaultTodos = [
            {
                todo: 'name',
                dueDate: 'somedate',
                category: 'category',
                completed: false,
                userId: userId
            },
        ]
    },
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            let hitList = await HitList.find({userId:req.user.id})
            if(!hitList || hitList.length === 0) {
                console.log('the hitlist is not there, we are trying to make it!')
                await createHitList(req)
                hitList = await HitList.find({userId:req.user.id})
                console.log('did we make it? hitlist is', hitList.current)
            }
          
            // days left to complete task 
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user, hitList: hitList[0] })
            // console.log(hitList, hitList[0].current, "hitList")
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        // console.log(req, "create")
        try{
            await Todo.create({
                todo: req.body.todoItem,
                dueDate: req.body.todoDueDate,
                category: req.body.todoCategory,
                completed: false,
                userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    // Update Category
    updateCategory: async (req, res) => {
        console.log('Attempting to change category.')
        console.log(req.body)
        try {
            await User.findOneAndUpdate({_id:req.body.userID}, {
                selectedCategory: req.body.category
            })
            console.log('Category updated.')
            res.json('Category updated.')
        } catch(err) {
            console.warn(err)
        }
    },
    // getEdit: (req, res) => {
    //   const id = req.params.id;
    //   TodoTask.find({}, (err, tasks) => {
    //     res.render("edit.ejs", {
    //       todoTasks: tasks, idTask: id
    //     });
    //   });
    // },
    updateTaskName: (req, res) => {
      const id = req.body.todoIdFromJSFile;
      TodoTask.findByIdAndUpdate(
        id,
        {
          todo: req.body.newName,
        //   content: req.body.content
        },
        err => {
          if (err) return res.status(500).send(err);
          res.redirect("/");
        });
    }
}    