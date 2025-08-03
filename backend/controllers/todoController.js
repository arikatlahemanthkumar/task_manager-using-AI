import Todo from "../models/Todo.js"

const todoCtrl = {}

todoCtrl.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.currentUser.userId }).sort({ createdAt: -1 })
    res.json(todos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

todoCtrl.createTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body
    const todo = new Todo({
      title,
      description,
      priority,
      dueDate,
      userId: req.currentUser.userId
    })
    await todo.save()
    res.status(201).json(todo)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

todoCtrl.updateTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.currentUser.userId },
      req.body,
      { new: true }
    )
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" })
    }
    res.json(todo)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

todoCtrl.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.currentUser.userId })
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" })
    }
    res.json({ message: "Todo deleted successfully" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

todoCtrl.toggleTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await Todo.findOne({ _id: id, userId: req.currentUser.userId })
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" })
    }
    todo.completed = !todo.completed
    await todo.save()
    res.json(todo)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export default todoCtrl 