import mongoose from "../../config.js";
const taskSchema = mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.String || mongoose.Schema.Types.Number,
    }
})
const TaskModel = mongoose.model('task', taskSchema,'task')
export default TaskModel