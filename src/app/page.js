"use client";
import { Provider } from "react-redux";
import store from "./store";
import TaskFlowApp from "@/components/taskflow";


export default function Main() {
  return (
    <Provider store={store}>
      <TaskFlowApp />
    </Provider>
  );
}
