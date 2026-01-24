// redux/slices.js
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    allTasks: [],
    filteredTasks: [],
    filterMode: "all",
    sort: "asc",
  },
  reducers: {
    addtask: (state, action) => {
      state.allTasks.push(action.payload);
      state.filteredTasks = state.allTasks;
      state.filterMode = "all";
    },
    removetask: (state, action) => {
      state.allTasks = state.allTasks.filter(
        (task) => task.id !== action.payload,
      );
      state.filteredTasks = state.filteredTasks.filter(
        (task) => task.id !== action.payload,
      );
    },
    togglecomplete: (state, action) => {
      state.allTasks = state.allTasks.map((task) =>
        task.id === action.payload
          ? { ...task, complete: !task.complete }
          : task,
      );
      if (state.filterMode === "completed") {
        state.filteredTasks = state.allTasks.filter((t) => t.complete);
      } else if (state.filterMode === "incomplete") {
        state.filteredTasks = state.allTasks.filter((t) => !t.complete);
      } else {
        state.filteredTasks = state.allTasks;
      }
    },
    sorttasks: (state) => {
      state.sort = state.sort === "asc" ? "desc" : "asc";

      state.filteredTasks = [...state.filteredTasks].sort((a, b) => {
        return state.sort === "asc"
          ? a.priority - b.priority
          : b.priority - a.priority;
      });
    },

    filtertasks: (state) => {
      if (state.filterMode === "incomplete") {
        state.filterMode = "completed";
        state.filteredTasks = state.allTasks.filter((t) => t.complete);
      } else if (state.filterMode === "completed") {
        state.filterMode = "all";
        state.filteredTasks = state.allTasks;
      } else {
        state.filterMode = "incomplete";
        state.filteredTasks = state.allTasks.filter((t) => !t.complete);
      }
    },
    edittasks: (state, action) => {
      const { id, updates } = action.payload;
      state.allTasks = state.allTasks.map((task) =>
        task.id === id ? { ...task, ...updates, date: Date.now() } : task,
      );
      state.filteredTasks = state.filteredTasks.map((task) =>
        task.id === id ? { ...task, ...updates, date: Date.now() } : task,
      );
    },
  },
});

export const {
  addtask,
  removetask,
  togglecomplete,
  sorttasks,
  filtertasks,
  edittasks,
} = taskSlice.actions;
export default taskSlice.reducer;
