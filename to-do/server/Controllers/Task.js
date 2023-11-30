import Task from "../models/Task.js";
import dayjs from "dayjs";
export const CreateTask = async (req, res, next) => {
  try {
    
    const { id } = req.user;
 
    const completionDate = new Date(req.body.date);
    const task = new Task({ ...req.body, userId: id, date: completionDate });
    const saveTask = await task.save();
    return res.status(201).json({ task: saveTask });
  } catch (err) {
    next(err);
  }
};

export const UpdateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, { ...req.body }, { new: true })
    return res.status(201).json({ task })
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id)
    return res.status(201).json({ message: 'Task deleted' })
  } catch (error) {
    next(err)
  }
}

export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id)
    return res.status(201).json({ task })
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const type = req.query?.type
    // const day = req.query?.day
    const { id } = req.user
 
    if (type === "Pending") {
      var tasks = await Task.find({ userId: id, date: { $gte: new Date().setHours(0, 0, 0, 0)  },  status:{ $ne: "completed"} })
    }
    else if (type === "Overdue") {
      var tasks = await Task.find({ userId: id, date: { $lt: new Date().setHours(0, 0, 0, 0)  } })
    } else if (type === "Completed") {
      var tasks = await Task.find({ userId: id, status: "completed" })
    }else{
      var tasks = await Task.find({userId: id})
    }
    return res.status(201).json({ tasks })
  } catch (err) {
    next(err);
  }
};
