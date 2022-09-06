const Todo = require('../models/Todo')
const User = require('../models/User')
const HitList = require('../models/hitlist')
const hitListController = require('./hitList')

// Create Hitlist function from hitList.js controller
const createHitList = hitListController.createHitList

//Creating default to dos
// const defaultTodo = require('../models/Todo')



module.exports = {

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
    //Populate with default tasks
    populate: async (req, res)=>{
        // console.log(req, 'default populated')
        const user = req.user.id
        const today = new Date()
        const nextWeek = today.setDate(today.getDate() + 7)

        try {
            await Todo.insertMany([
                {todo: 'Push String Methods Codewars', completed: false, dueDate: today, category: 'Daily', userId: user},
                {todo: 'Turn in homework', completed: false, dueDate: nextWeek, userId: user, category: 'Weekly'},
                {todo: 'Networking - 1 coffee chat', completed: false, dueDate: nextWeek, userId: user, category: 'Weekly'},
                {todo: 'Networking - 3 connections', completed: false, dueDate: nextWeek, userId: user, category: 'Weekly'},
                {todo: 'Update networking sheet', completed: false, dueDate: nextWeek, userId: user, category: 'Weekly'},
                {todo: 'Interview ANKI cards', completed: false, dueDate: today, userId: user, category: 'Interview Prep'},
                {todo: 'Team Project', completed: false, userId: user, dueDate: nextWeek, category: 'Big Picture'},
                {todo: 'Professional Checklist', completed: false, userId: user, dueDate: '2022-08-30', category: 'Big Picture'},
                {todo: 'Hitlist', completed: false, userId: user, dueDate: '2022-09-13', category: 'Big Picture'},
                {todo: 'Client signature/Approved PR', completed: false, userId: user, dueDate: '2022-09-27', category: 'Big Picture'},
                {todo: '10 Premium Apps', completed: false, userId: user, dueDate: '2022-10-11', category: 'Big Picture'},
                {todo: 'Beautiful MVP', completed: false, userId: user, dueDate: '2022-09-27', category: '100 Hours'},
                {todo: 'Completed project', completed: false, userId: user, dueDate: '2022-10-11', category: '100 Hours'},
                ])
            console.log('default task added')
            res.redirect('/todos')
        }catch (err) {
            console.log(err)
        }
    }
}    