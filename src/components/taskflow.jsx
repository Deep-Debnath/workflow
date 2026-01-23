// components/TaskFlowApp.jsx
import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import {
  Add,
  FilterListRounded,
  SortRounded,
  Person,
} from "@mui/icons-material";
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
          <div className="bg-[#1b263b] flex items-center justify-between shadow-md">
            <Typography
              variant="h5"
              sx={{
                ml: { sm: 5, xs: 3 },
                fontWeight: 600,
                color: "#e0e1dd",
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
                <Person sx={{fontSize:30 , color:"white"}}/>
              </IconButton>
            </Box>
          </div>

          <div className="bg-[#0d1b2a] backdrop-blur-sm pt-2 overflow-y-auto relative">
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
                    className="text-center text-2xl relative top-4"
                    key={filterMode}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 5, opacity: 0 }}
                  >
                    No {getModeLabel().toLowerCase()} 🌱
                  </motion.div>
                </AnimatePresence>
              )}
            </AnimatePresence>
          </div>

          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 60, sm: 100 },
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <Tooltip title="filter" arrow placement="top">
              <IconButton
                onClick={handleFilter}
                sx={{
                  color: "black",
                  width: 80,
                  height: 40,
                  borderTopLeftRadius: 30,
                  borderBottomLeftRadius: 30,
                  background: "linear-gradient(135deg, #ffe0b2, #fff3cd)",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                  "&:hover": { transform: "scale(1.05)" },
                  pointerEvents: "auto",
                }}
              >
                <FilterListRounded />
              </IconButton>
            </Tooltip>

            <Button
              onClick={() => setOpen(true)}
              sx={{
                width: 60,
                height: 60,
                borderRadius: "80px",
                bgcolor: "#fbc02d",
                color: "white",
                pointerEvents: "auto",
                "& .icon": {
                  transition: "transform 0.3s ease",
                },
                "&:hover .icon": {
                  transform: "rotate(45deg)",
                },
              }}
            >
              <Box className="icon">
                <Add sx={{ fontSize: 30 }} />
              </Box>
            </Button>

            <Tooltip title="sort" arrow placement="top">
              <IconButton
                onClick={handleSort}
                sx={{
                  color: "black",
                  width: 80,
                  height: 40,
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                  background: "linear-gradient(135deg, #ffe0b2, #fff3cd)",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                  "&:hover": { transform: "scale(1.05)" },
                  pointerEvents: "auto",
                }}
              >
                <SortRounded />
              </IconButton>
            </Tooltip>
          </Box>
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
