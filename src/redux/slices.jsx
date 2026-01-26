// redux/slices.js
import { createSlice } from "@reduxjs/toolkit";

const sortByMode = (tasks, sort) => {
  return [...tasks].sort((a, b) => {
    switch (sort) {
      case "Priority (High)":
        return b.priority - a.priority;
      case "Priority (Low)":
        return a.priority - b.priority;
      case "Date (Old)":
        return a.date - b.date;
      case "Date (New)":
      default:
        return b.date - a.date;
    }
  });
};

const applyFilterAndSort = (state) => {
  let tasks = state.allTasks;

  if (state.filterMode === "completed") {
    tasks = tasks.filter((t) => t.complete);
  } else if (state.filterMode === "incomplete") {
    tasks = tasks.filter((t) => !t.complete);
  }

  state.filteredTasks = sortByMode(tasks, state.sort);
};

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
      state.sort = "Date (New)";
      state.filterMode = "all";
      applyFilterAndSort(state);
    },

    removetask: (state, action) => {
      state.allTasks = state.allTasks.filter(
        (task) => task.id !== action.payload,
      );
      applyFilterAndSort(state);
    },

    togglecomplete: (state, action) => {
      state.allTasks = state.allTasks.map((task) =>
        task.id === action.payload
          ? { ...task, complete: !task.complete }
          : task,
      );
      applyFilterAndSort(state);
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
      applyFilterAndSort(state);
    },

    filtertasks: (state) => {
      if (state.filterMode === "all") {
        state.filterMode = "incomplete";
      } else if (state.filterMode === "incomplete") {
        state.filterMode = "completed";
      } else {
        state.filterMode = "all";
      }
      applyFilterAndSort(state);
    },

    edittasks: (state, action) => {
      const { id, updates } = action.payload;

      state.allTasks = state.allTasks.map((task) =>
        task.id === id ? { ...task, ...updates, date: Date.now() } : task,
      );

      state.sort = "Date (New)";
      applyFilterAndSort(state);
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
