import { Schema, model } from "mongoose"

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const Todo = model("Todo", TodoSchema)
export default Todo 