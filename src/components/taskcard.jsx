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
  CheckBox,
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
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

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handlesave = () => {
    dispatch(
      edittasks({
        id: task.id,
        updates: {
          title,
          description: desc,
        },
      }),
    );
  };

  return (
    <Card
      layout
      component={motion.div}
      variants={child}
      initial="hidden"
      animate="visible"
      exit="exit"
      sx={{
        mb: 1,
        mx: 1,
        px: isMobile ? 1.25 : 2,
        py: isMobile ? 1.15 : 1.45,

        borderRadius: "14px",
        border: "1px solid #1F2937",

        backgroundColor: task.complete ? "#0B1220" : "#111827",

        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",

        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: isMobile ? 1 : 2,

        transition: "all .18s ease",

        "&:hover": {
          backgroundColor: "#1F2937",
          borderColor: "#FACC15",
          boxShadow: "0 8px 22px rgba(0,0,0,0.55)",
        },
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
            sx={{
              mt: 0.5,
              "& .MuiInputBase-input": {
                color: "#F9FAFB",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#020617",
                borderRadius: "8px",
              },
            }}
          />
        ) : (
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            onClick={() => setedittitle(true)}
            sx={{
              position: "relative",
              display: "inline-block", // ⭐ REQUIRED
              fontWeight: 600,
              wordBreak: "break-word",
              cursor: "pointer",

              color: task.complete ? "#9CA3AF" : "#F9FAFB",
              transition: "color 250ms ease",

              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "55%", // perfect strike position
                width: "100%", // ✅ EXACT text width
                height: "2px",
                backgroundColor: "#9CA3AF",

                transform: task.complete ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 280ms ease-in-out",

                pointerEvents: "none",
              },

              "&:hover": {
                opacity: task.complete ? 0.7 : 0.9,
              },
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
            sx={{
              mt: 0.5,
              "& .MuiInputBase-input": {
                color: "#F9FAFB",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#020617",
                borderRadius: "8px",
              },
            }}
          />
        ) : (
          <Typography
            variant="body2"
            color="#9CA3AF"
            onClick={() => {
              seteditdesc(true);
            }}
            sx={{
              mt: 0.5,
              color: "#9CA3AF",
              opacity: task.complete ? 0.6 : 0.85,
              wordBreak: "break-word",
              cursor: "pointer",
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
          gap: { xs: 0.7, sm: 1.2 },
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            fontSize: "0.75rem",
            color: "#9CA3AF",
            mt: 0.3,
          }}
        >
          {formatDateTime(task.date)}
        </Box>

        <Chip
          size="small"
          icon={<Star />}
          label={ratebox[task.priority - 1]}
          sx={{
            bgcolor: "#064E3B",
            color: "#6EE7B7",
            fontWeight: 600,
            borderRadius: "10px",
            fontSize: isMobile ? "0.7rem" : "0.8rem",

            "& .MuiChip-icon": {
              color: "#FACC15",
            },
          }}
        />
        <IconButton
          color={task.complete ? "success" : "default"}
          onClick={() => handleToggle(task.id)}
          sx={{
            // bgcolor: task.complete
            //   ? "rgba(34,197,94,0.15)"
            //   : "rgba(255,255,255,0.04)",

            color: task.complete ? "#22C55E" : "#9CA3AF",
            scale: { xs: 0.9, sm: 1 },

            transition: "all .3s ease",

            "&:hover": {
              bgcolor: "rgba(34,197,94,0.25)",
              color: "#22C55E",
            },
          }}
        >
          {task.complete ? <CheckBox /> : <RadioButtonUnchecked />}
        </IconButton>

        <IconButton
          color="error"
          onClick={() => handleRemove(task.id)}
          sx={{
            // bgcolor: "rgba(239,68,68,0.08)",
            color: "#EF4444",
            scale: { xs: 0.9, sm: 1 },

            transition: "all 0.30s ease",

            "&:hover": {
              bgcolor: "#EF4444",
              color: "#FFFFFF",
            },
          }}
        >
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
}
