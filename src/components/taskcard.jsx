import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  useMediaQuery,
  TextField,
  Button,
} from "@mui/material";
import {
  CheckCircle,
  Delete,
  RadioButtonUnchecked,
  Star,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edittasks } from "@/redux/slices";

const child = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function TaskCard({ task, handleToggle, handleRemove }) {
  const ratebox = ["low", "mid-low", "mid", "mid-high", "high"];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const [edittitle, setedittitle] = useState(false);
  const [editdesc, seteditdesc] = useState(false);
  const [title, settitle] = useState(task.title);
  const [desc, setdesc] = useState(task.description);

  const handlesave = () => {
    dispatch(edittasks({ id: task.id, updates: { title, description: desc } }));
  };

  return (
    <Card
      component={motion.div}
      variants={child}
      initial="hidden"
      animate="visible"
      exit="exit"
      sx={{
        mb: 1,
        mx:1,
        px: isMobile ? 1 : 2,
        py: isMobile ? 1 : 1.5,
        borderRadius: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        bgcolor: task.complete ? "#e7f6e7" : "rgba(255,255,255,0.9)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: isMobile ? 1 : 2,
        transition: "all 0.3s inherit",
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 0 }}>
        {edittitle ? (
          <TextField
            value={title}
            onChange={(e) => settitle(e.target.value)}
            onBlur={() => {
              setedittitle(false);
              handlesave();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setedittitle(false);
                handlesave();
              }
            }}
            autoFocus
            size="small"
            fullWidth
          />
        ) : (
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            onClick={() => setedittitle(true)}
            sx={{
              textDecoration: task.complete ? "line-through" : "none",
              color: task.complete ? "gray" : "#1e293b",
              fontWeight: 600,
              wordBreak: "break-word",
            }}
          >
            {title}
          </Typography>
        )}
        {editdesc ? (
          <TextField
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                seteditdesc(false);
                handlesave();
              }
            }}
            onBlur={() => {
              seteditdesc(false);
              handlesave();
            }}
            autoFocus
            multiline
            minRows={1}
            fullWidth
            size="small"
            sx={{ mt: 0.5 ,height:"auto"}}
          />
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            onClick={() => {
              seteditdesc(true);
            }}
            sx={{
              opacity: 0.85,
              mt: 0.5,
              wordBreak: "break-word",
            }}
          >
            {desc || "...add description"}
          </Typography>
        )}
      </CardContent>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "flex-end" : "center",
          width: isMobile ? "100%" : "auto",
          gap: 1.2,
          flexWrap: "wrap",
        }}
      >
        <Chip
          size="small"
          icon={<Star />}
          label={ratebox[task.priority - 1]}
          sx={{
            bgcolor: "#fff3cd",
            color: "#795548",
            fontWeight: 600,
            borderRadius: "10px",
            "& .MuiChip-icon": { color: "#fbbf24" },
            fontSize: isMobile ? "0.7rem" : "0.8rem",
          }}
        />

        <IconButton
          color={task.complete ? "success" : "default"}
          onClick={() => handleToggle(task.id)}
          sx={{
            bgcolor: "rgba(0,0,0,0.03)",
            transition: "0.2s",
            "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
          }}
        >
          {task.complete ? <CheckCircle /> : <RadioButtonUnchecked />}
        </IconButton>

        <IconButton
          color="error"
          onClick={() => handleRemove(task.id)}
          sx={{
            bgcolor: "rgba(255,0,0,0.05)",
            transition: "0.2s",
            "&:hover": { bgcolor: "rgba(255,0,0,0.15)" },
          }}
        >
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
}
