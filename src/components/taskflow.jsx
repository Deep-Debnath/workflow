import { Typography, Box, IconButton, B, Popover } from "@mui/material";
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
import LoginModal from "./login";
import SignUpModal from "./signup";
import LogoutModal from "./logout";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

//not using currently

// import { subscribeTasks } from "@/redux/taskthunk";
// firestore
// function FirestoreBridge() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     if (!user) return;
//     const unsub = dispatch(subscribeTasks(user));
//     return () => unsub && unsub();
//   }, [user, dispatch]);

//   return null;
// }

export default function TaskFlowApp() {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [logout, setLogout] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(3);
  const [waitforlog, setwaitforlog] = useState(true);

  const { allTasks, filteredTasks, filterMode, sort } = useSelector(
    (state) => state.tasks,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setwaitforlog(false);
    }, 2000);
  }, []);

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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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
  const getSortLabel = () => {
    return sort;
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className="w-full h-full shadow-xl grid grid-rows-[70px_26px_1fr]">
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

            <Box
              sx={{
                mr: { sm: 5, xs: 3 },
              }}
            >
              <div className="flex  sm:flex-row items-center gap-2 sm:gap-2 select-none">
                <label
                  className="
                  text-[14px] sm:text-sm text-slate-300 max-w-[90px] truncate text-center sm:text-right"
                >
                  {user ? user?.displayName?.toUpperCase() || "User" : "Login"}
                </label>
                <IconButton
                  aria-label="auth"
                  disabled={waitforlog}
                  onClick={() => {
                    user ? setLogout(true) : setLogin(true);
                  }}
                  sx={{
                    bgcolor: user ? "#0F172A" : "rgba(255,255,255,0.05)",
                    border: user ? "1.5px solid #FACC15" : "1px solid #1E293B",
                    boxShadow: user
                      ? "0 0 0 3px rgba(250,204,21,0.15)"
                      : "none",

                    width: { xs: 36, sm: 42 },
                    height: { xs: 36, sm: 42 },
                    transition: "all 0.2s ease",

                    "&:hover": {
                      bgcolor: user ? "#020617" : "rgba(255,255,255,0.1)",
                      transform: "translateY(-1px)",
                    },

                    "&:active": {
                      transform: "scale(0.96)",
                    },
                  }}
                >
                  <Person
                    sx={{
                      fontSize: { xs: 22, sm: 26 },
                      color: user ? "#FACC15" : "#CBD5E1",
                    }}
                  />
                </IconButton>
              </div>
            </Box>
          </div>
          <div className="bg-[#0B1220] border-b border-[#1E293B] flex items-center justify-center py-2 relative">
            <div className="absolute left-[50%] -translate-x-full pr-6 w-[140px] text-right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={filterMode}
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -6, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="text-amber-300 font-medium tracking-wide text-sm"
                >
                  {getModeLabel()}
                </motion.div>
              </AnimatePresence>
            </div>

            <span className="text-[#334155] text-sm select-none">•</span>

            <div className="absolute left-1/2 pl-6 w-[140px] text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sort}
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -6, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="text-amber-300 font-medium tracking-wide text-sm"
                >
                  By {getSortLabel()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-[#100D0D] backdrop-blur-sm pt-2 overflow-y-auto relative h-full">
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
      {/* <FirestoreBridge /> */}
      <SignUpModal
        open={signUp}
        handleClose={() => setSignUp(false)}
        openLogin={() => setLogin(true)}
      />
      {user ? (
        <LogoutModal
          open={logout}
          handleClose={() => setLogout(false)}
          userinfo={user}
        />
      ) : (
        <LoginModal
          open={login}
          handleClose={() => setLogin(false)}
          openSignUp={() => setSignUp(true)}
        />
      )}
      <TaskModal
        open={open}
        handleClose={() => setOpen(false)}
        handleAddTask={handleAdd}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        setPriority={setPriority}
        priority={priority}
      />
    </div>
  );
}
