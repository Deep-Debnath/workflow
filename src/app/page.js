"use client";
import { Provider } from "react-redux";
import store from "./store";
import TaskFlowApp from "@/components/taskflow";
import AuthListener from "@/components/auth";


export default function Main() {
  return (
    <Provider store={store}>
      <AuthListener/>
      <TaskFlowApp />
    </Provider>
  );
}
