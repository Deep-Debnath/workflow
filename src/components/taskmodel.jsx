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
} from "@mui/material";
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
}) {
  const titleref = useRef();
  const descref = useRef();

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
          width: 400,
          borderRadius: 3,
          boxShadow: 6,
          p: 2,
          bgcolor: "background.paper",
        }}
      >
        <CardContent>
          <Typography
            id="add-task-modal"
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
          >
            Add New Task
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              inputRef={titleref}
              fullWidth
              label="Title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => nextref(e, descref)}
            />
            <TextField
              inputRef={descref}
              fullWidth
              label="Description"
              multiline
              rows={3}
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => nextref(e)}
            />
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", gap: 1 }}>
          <Rating onChange={(e) => setPriority(e.target.value)} />
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            disabled={!title.trim()}
          >
            Add Task
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
