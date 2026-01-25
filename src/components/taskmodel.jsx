import {
  Card,
  Modal,
  Typography,
  Box,
  CardContent,
  TextField,
  CardActions,
  Button,
  Rating,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function TaskModal({
  open,
  handleClose,
  handleAddTask,
  title,
  setTitle,
  description,
  setDescription,
  setPriority,
  priority,
}) {
  const titleref = useRef();
  const descref = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const ratebox = ["low", "low-mid", "mid", "mid-high", "high"];

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        titleref.current.focus();
      }, 100);
    }
  }, [open]);

  const nextref = (e, next) => {
    if (!title.trim()) return;
    if (e.key === "Enter") {
      e.preventDefault();
      if (next) {
        next.current.focus();
      } else {
        handleAddTask();
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-task-modal"
      className="flex items-center justify-center"
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          mx: 1.5,
          borderRadius: 3,
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          p: { xs: 1.2, sm: 2 },
          bgcolor: "#0B1220",
          border: "1px solid #1E293B",
        }}
      >
        <CardContent>
          <Typography
            id="add-task-modal"
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 600,
              textAlign: "center",
              color: "#E5E7EB",
              letterSpacing: 0.3,
            }}
          >
            Add New Task
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* TITLE */}
            <TextField
              inputRef={titleref}
              fullWidth
              size={isMobile ? "small" : "medium"}
              label="Title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => nextref(e, descref)}
              sx={{
                bgcolor: "#020617",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  color: "#E5E7EB",
                  "& fieldset": {
                    borderColor: "#1E293B",
                  },
                  "&:hover fieldset": {
                    borderColor: "#334155",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FACC15",
                    boxShadow: "0 0 0 1px rgba(250,204,21,0.3)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#94A3B8",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FACC15",
                },
              }}
            />

            {/* DESCRIPTION */}
            <TextField
              inputRef={descref}
              fullWidth
              size={isMobile ? "small" : "medium"}
              label="Description"
              multiline
              minRows={isMobile ? 2 : 3}
              maxRows={4}
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => nextref(e)}
              sx={{
                bgcolor: "#020617",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  color: "#E5E7EB",
                  "& fieldset": {
                    borderColor: "#1E293B",
                  },
                  "&:hover fieldset": {
                    borderColor: "#334155",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FACC15",
                    boxShadow: "0 0 0 1px rgba(250,204,21,0.3)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#94A3B8",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FACC15",
                },
              }}
            />
          </Box>
        </CardContent>

        <CardActions
          disableSpacing
          sx={{
            px: 1.5,
            pt: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1.4,
          }}
        >
          {/* PRIORITY */}
          <motion.div className="self-center w-59 flex justify-between gap-4">
            <Rating
              value={priority}
              onChange={(e, val) => setPriority(val)}
              // size={isMobile ? "small" : "medium"}
              sx={{
                color: "#FACC15",
                "& .MuiRating-iconEmpty": {
                  color: "#475569",
                },
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={priority}
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.18 }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    px: 1.3,
                    py: 0.45,
                    borderRadius: 2,
                    fontWeight: 700,
                    letterSpacing: 0.4,
                    bgcolor: "rgba(250,204,21,0.15)",
                    color: "#FACC15",
                    textTransform: "uppercase",
                    minWidth: 72,
                    textAlign: "center",
                    border: "1px solid rgba(250,204,21,0.3)",
                  }}
                >
                  {ratebox[priority - 1]}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <Box
            sx={{
              ml: 0,
              display: "flex",
              width: "100%",
              gap: 1.5,
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              onClick={handleClose}
              fullWidth
              sx={{
                height: 48,
                borderRadius: 2.5,
                bgcolor: "#1E293B",
                color: "#CBD5F5",
                fontWeight: 500,
                boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.15)",
                "&:hover": {
                  bgcolor: "#273449",
                },
              }}
            >
              Cancel
            </Button>

            {/* Add Task */}
            <Button
              variant="contained"
              onClick={handleAddTask}
              disabled={!title.trim()}
              fullWidth
              sx={{
                height: 48,
                borderRadius: 2.5,

                bgcolor: "#C5A028",
                color: "#0B1220",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                "&:hover": {
                  bgcolor: "#A68620",
                  boxShadow: "none",
                },
                "&.Mui-disabled": {
                  bgcolor: "rgba(148,163,184,0.12)",
                  color: "#475569",
                },
              }}
            >
              Add Task
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Modal>
  );
}
