import { auth } from "@/firebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  Card,
  Modal,
  Box,
  CardContent,
  TextField,
  CardActions,
  Button,
  useMediaQuery,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function LoginModal({ open, handleClose, openLogin }) {
  const emailref = useRef();
  const usernameref = useRef();
  const passwordref = useRef();
  const password2ref = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [pw2Error, setPw2Error] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [submit, setSubmit] = useState(false);

  const validationAndSignin = async () => {
    setEmailError("");
    setPwError("");
    setPw2Error("");

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordStrong = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);

    if (!isEmailValid) {
      setEmailError("Invalid email address");
      return;
    }

    if (!password) {
      setPwError("Password is required");
      return;
    }

    if (!isPasswordStrong) {
      setPwError("Use letters & numbers (min 6)");
      return;
    }

    if (password !== password2) {
      setPw2Error("Password must be same");
      return;
    }

    if (!username.trim()) {
      setPw2Error("Username required");
      return;
    }

    if (username.trim().length < 3) {
      setPw2Error("Username too short");
      return;
    }

    setSubmit(true);

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim(),
      );

      await updateProfile(userCred.user, {
        displayName: username.trim(),
      });

      handleClose();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setEmailError("Email already registered");
      } else {
        setPwError("Something went wrong. Try again.");
      }
    } finally {
      setSubmit(false);
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        emailref.current.focus();
      }, 100);
    }
  }, [open]);

  const nextref = (e, next) => {
    if (!email.trim()) {
      if (e.key === "Enter") {
        setEmailError("Email cannot be empty");
      }
      return;
    }
    setEmailError("");
    setPwError("");
    setPw2Error("");
    if (e.key === "Enter") {
      e.preventDefault();
      if (next) {
        next.current.focus();
      } else {
        validationAndSignin();
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setEmailError("");
        setPwError("");
        setemail("");
        setpassword("");
        setpassword2("");
        setUsername("");
      }}
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
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 3.5,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                inputRef={emailref}
                fullWidth
                size={isMobile ? "small" : "medium"}
                label="Email"
                placeholder="Enter Your Email Address"
                value={email.trim()}
                onChange={(e) => {
                  setemail(e.target.value);

                  setUsername(e.target.value.split("@")[0]);
                }}
                onKeyDown={(e) => nextref(e, passwordref)}
                sx={{
                  bgcolor: "#020617",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#E5E7EB",
                    "& fieldset": { borderColor: "#1E293B" },
                    "&:hover fieldset": { borderColor: "#334155" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FACC15",
                      boxShadow: "0 0 0 1px rgba(250,204,21,0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#94A3B8" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#FACC15" },
                }}
              />
            </motion.div>
            <AnimatePresence>
              {emailError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: "absolute",
                    top: isMobile ? "18%" : "20%",
                    right: 0,
                    fontSize: "0.8rem",
                    color: "#F87177",
                    pointerEvents: "none",
                  }}
                >
                  {emailError}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <TextField
                type={showPassword ? "text" : "password"}
                inputRef={passwordref}
                fullWidth
                size={isMobile ? "small" : "medium"}
                label="Password"
                placeholder="Enter Your Password"
                value={password.trim()}
                onChange={(e) => setpassword(e.target.value)}
                onKeyDown={(e) => nextref(e, password2ref)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowpassword((prev) => !prev)}
                        edge="end"
                        size="small"
                        sx={{ color: "#94A3B8" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  bgcolor: "#020617",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#E5E7EB",
                    "& fieldset": { borderColor: "#1E293B" },
                    "&:hover fieldset": { borderColor: "#334155" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FACC15",
                      boxShadow: "0 0 0 1px rgba(250,204,21,0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#94A3B8" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#FACC15" },
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <TextField
                type="password"
                inputRef={password2ref}
                fullWidth
                size={isMobile ? "small" : "medium"}
                label="Confirm Password"
                placeholder="Confirm Your Password"
                value={password2.trim()}
                onChange={(e) => setpassword2(e.target.value)}
                onKeyDown={(e) => nextref(e, usernameref)}
                sx={{
                  bgcolor: "#020617",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#E5E7EB",
                    "& fieldset": { borderColor: "#1E293B" },
                    "&:hover fieldset": { borderColor: "#334155" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FACC15",
                      boxShadow: "0 0 0 1px rgba(250,204,21,0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#94A3B8" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#FACC15" },
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                inputRef={usernameref}
                fullWidth
                size={isMobile ? "small" : "medium"}
                label="Username"
                placeholder="Enter Username"
                value={username.trim()}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => nextref(e)}
                sx={{
                  bgcolor: "#020617",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#E5E7EB",
                    "& fieldset": { borderColor: "#1E293B" },
                    "&:hover fieldset": { borderColor: "#334155" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FACC15",
                      boxShadow: "0 0 0 1px rgba(250,204,21,0.3)",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#94A3B8" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#FACC15" },
                }}
              />
            </motion.div>
            <AnimatePresence>
              {pw2Error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: "absolute",
                    top: "74%",
                    right: 0,
                    fontSize: "0.8rem",
                    color: "#F87177",
                    pointerEvents: "none",
                  }}
                >
                  {pw2Error}
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {pwError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: "absolute",
                    top: isMobile ? "46%" : "47%",
                    right: 0,
                    fontSize: "0.8rem",
                    color: "#F87177",
                    pointerEvents: "none",
                  }}
                >
                  {pwError}
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </CardContent>

        <motion.div
          transition={{ duration: 0.3, delay: 0.1 }}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <CardActions
            disableSpacing
            sx={{
              px: 2.4,
              display: "flex",
              gap: 1.4,
              justifyContent: "space-between",
            }}
          >
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-300">Already user?</span>
              <button
                className="text-blue-400 hover:underline"
                onClick={() => {
                  openLogin();
                  handleClose();
                  setEmailError("");
                  setPwError("");
                  setPw2Error("");
                  setemail("");
                  setpassword("");
                  setpassword2("");
                  setUsername("");
                }}
              >
                Login
              </button>
            </div>
            <Button
              disabled={submit}
              variant="contained"
              sx={{
                bgcolor: "#fbbf24",
                color: "brown",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#ffb300",
                },
                fontSize: isMobile ? ".8rem" : ".9rem",
              }}
              onClick={validationAndSignin}
            >
              Sign up
            </Button>
          </CardActions>
        </motion.div>
      </Card>
    </Modal>
  );
}
