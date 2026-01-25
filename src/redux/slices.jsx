// redux/slices.js
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    allTasks: [],
    filteredTasks: [],
    filterMode: "all",
    sort: "Date (New)",
  },
  reducers: {
    addtask: (state, action) => {
      state.allTasks.unshift(action.payload);
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
      const order = [
        "Priority (High)",
        "Priority (Low)",
        "Date (New)",
        "Date (Old)",
      ];

      const currentIndex = order.indexOf(state.sort);
      state.sort = order[(currentIndex + 1) % order.length];

      state.filteredTasks = [...state.filteredTasks].sort((a, b) => {
        switch (state.sort) {
          case "Priority (High)":
            return b.priority - a.priority; // high → low
          case "Priority (Low)":
            return a.priority - b.priority; // low → high
          case "Date (Old)":
            return a.date - b.date; // oldest first
          case "Date (New)":
            return b.date - a.date; // newest first
          default:
            return 0;
        }
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
