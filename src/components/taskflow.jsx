import { Typography, Box, IconButton, B } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtask,
  filtertasks,
  removetask,
  sorttasks,
  togglecomplete,
} from "@/redux/slices";
import TaskModal from "./taskmodel";
import TaskCard from "./taskcard";
import { AnimatePresence, motion } from "framer-motion";
import FloatingBtns from "./floatingButtons";

export default function TaskFlowApp() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(3);

  const { allTasks, filteredTasks, filterMode } = useSelector(
    (state) => state.tasks,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("item-box");

    if (saved) {
      const tasks = JSON.parse(saved);

      const uniqueTasks = tasks.reduce((acc, cur) => {
        if (!acc.find((t) => t.id === cur.id)) {
          acc.push(cur);
        }
        return acc;
      }, []);

      uniqueTasks.forEach((task) => dispatch(addtask(task)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("item-box", JSON.stringify(allTasks));
  }, [allTasks]);

  const handleAdd = () => {
    if (!title.trim()) return;
    const task = {
      id: Date.now(),
      title,
      description,
      complete: false,
      priority,
      date: Date.now(),
    };
    dispatch(addtask(task));
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  const handleRemove = (id) => dispatch(removetask(id));
  const handleToggle = (id) => dispatch(togglecomplete(id));
  const handleFilter = () => dispatch(filtertasks());
  const handleSort = () => dispatch(sorttasks());

  const getModeLabel = () => {
    if (filterMode === "completed") return "Completed Tasks";
    if (filterMode === "incomplete") return "Incomplete Tasks";
    return "All Tasks";
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className="w-full h-full shadow-xl grid grid-rows-[70px_1fr]">
          <div className="bg-[#070609] border-b-2 border-b-[#1E293B] flex items-center justify-between shadow-md">
            <Typography
              variant="h5"
              sx={{
                ml: { sm: 5, xs: 3 },
                fontWeight: 700,
                color: "#FACC15",
                letterSpacing: 1,
              }}
            >
              TaskFlow
            </Typography>
            <AnimatePresence mode="wait">
              <motion.div
                key={filterMode}
                transition={{ duration: 0.3 }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
              >
                {getModeLabel()}
              </motion.div>
            </AnimatePresence>
            <Box
              sx={{
                mr: { sm: 5, xs: 3 },
              }}
            >
              <IconButton aria-label="auth">
                <Person sx={{ fontSize: 30, color: "#CBD5E1" }} />
              </IconButton>
            </Box>
          </div>

          <div className="bg-[#100D0D] backdrop-blur-sm pt-2 overflow-y-auto relative">
            <AnimatePresence>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    exit={{ opacity: 0, y: -30, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TaskCard
                      task={task}
                      handleToggle={handleToggle}
                      handleRemove={handleRemove}
                    />
                  </motion.div>
                ))
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    className="text-center text-white sm:text-xl text-md relative top-4"
                    key={filterMode}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 5, opacity: 0 }}
                  >
                    No {getModeLabel().toLowerCase()}
                  </motion.div>
                </AnimatePresence>
              )}
            </AnimatePresence>
          </div>

          <FloatingBtns
            handleFilter={handleFilter}
            handleSort={handleSort}
            setOpen={setOpen}
          />
        </Box>
      </Box>

      {/* Modal */}
      <TaskModal
        open={open}
        handleClose={() => setOpen(false)}
        handleAddTask={handleAdd}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        setPriority={setPriority}
      />
    </div>
  );
}
