import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase";

export const listenToTasks = (uid, callback) => {
  const q = query(
    collection(db, "users", uid, "tasks"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((d) => ({
      firestoreId: d.id,
      ...d.data(),
    }));
    callback(tasks);
  });
};

export const addTaskFS = (uid, task) =>
  addDoc(collection(db, "users", uid, "tasks"), {
    ...task,
    createdAt: serverTimestamp(),
  });

export const deleteTaskFS = (uid, taskId) =>
  deleteDoc(doc(db, "users", uid, "tasks", taskId));

export const toggleTaskFS = (uid, task) =>
  updateDoc(doc(db, "users", uid, "tasks", task.firestoreId), {
    complete: !task.complete,
  });
