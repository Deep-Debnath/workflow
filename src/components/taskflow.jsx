// components/TaskFlowApp.jsx
import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import { Add, FilterListRounded, SortRounded } from "@mui/icons-material";
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
    (state) => state.tasks
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("item-box");
    if (saved) {
      JSON.parse(saved).forEach((task) => dispatch(addtask(task)));
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
    if (filterMode === "completed") return "✅ Completed";
    if (filterMode === "incomplete") return "🕓 Incomplete";
    return "📋 All Tasks";
  };

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center">
      <Container
        maxWidth="md"
        sx={{
          height: { sm: "90vh", xs: "100vh" },
          py: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          className="bg-gradient-to-tr from-pink-200 via-yellow-100 to-cyan-200 
                     w-full h-full rounded-3xl shadow-xl grid grid-rows-[70px_1fr]"
        >
          <div className="bg-amber-400 rounded-t-3xl flex flex-col items-center justify-center shadow-md">
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "#4B2E05", letterSpacing: 1 }}
            >
              🌸 TaskFlow
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#4B2E05", fontWeight: 500 }}
            >
              Showing {getModeLabel()}
            </Typography>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-b-3xl m-2 p-1 overflow-y-auto relative">
            <AnimatePresence>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    exit={{ opacity: 0, y: -30 }}
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
                <Typography align="center" color="text.secondary">
                  No {getModeLabel().toLowerCase()} 🌱
                </Typography>
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
              zIndex: 5,
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
                }}
              >
                <FilterListRounded />
              </IconButton>
            </Tooltip>

            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                fontSize: 30,
                bgcolor: "#fbc02d",
                color: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                "&:hover": { bgcolor: "#fdd833" },
              }}
            >
              <Add />
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
                }}
              >
                <SortRounded />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>

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
