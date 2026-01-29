//not using currently

import { addtask, removetask, togglecomplete } from "./slices";
import {
  listenToTasks,
  addTaskFS,
  deleteTaskFS,
  toggleTaskFS,
} from "@/firestore/taskservice";

export const subscribeTasks = (user) => (dispatch) => {
  if (!user) return;

  return listenToTasks(user.uid, (tasks) => {
    tasks.forEach((t) => dispatch(addtask(t)));
  });
};

export const addTask = (user, task) => async (dispatch) => {
  if (user) {
    await addTaskFS(user.uid, task);
  } else {
    dispatch(addtask({ ...task, id: Date.now(), date: Date.now() }));
  }
};

export const removeTask = (user, task) => async (dispatch) => {
  if (user && task.firestoreId) {
    await deleteTaskFS(user.uid, task.firestoreId);
  } else {
    dispatch(removetask(task.id));
  }
};

export const toggleTask = (user, task) => async (dispatch) => {
  if (user && task.firestoreId) {
    await toggleTaskFS(user.uid, task);
  } else {
    dispatch(togglecomplete(task.id));
  }
};
