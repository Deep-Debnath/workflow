import { signOut } from "firebase/auth";
import { Button, Card, CardActions, Modal, Typography, Avatar } from "@mui/material";
import { auth } from "@/firebase";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LogoutModal({ open, handleClose, userinfo }) {
    useEffect(()=>{
        open&&
        console.log(userinfo);
        
    },[open])
  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleClose(); 
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center"
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          mx: 1.5,
          borderRadius: 3,
          p: 2,
          bgcolor: "#0B1220",
          border: "1px solid #1E293B",
        }}
      >
        <motion.div
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-4 px-3 py-4">
            <Avatar
              src={userinfo?.photoURL || ""}
              sx={{ width: 48, height: 48 }}
            >
              {userinfo?.email?.[0]?.toUpperCase()}
            </Avatar>

            <div>
              <Typography sx={{ color: "#F9FAFB", fontWeight: 600 }}>
                {userinfo?.displayName || "User"}
              </Typography>
              <Typography sx={{ color: "#9CA3AF", fontSize: ".85rem" }}>
                {userinfo?.email}
              </Typography>
            </div>
          </div>

          {/* ACTIONS */}
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              px: 2,
              pb: 2,
            }}
          >
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{
                bgcolor: "#fbbf24",
                color: "brown",
                fontWeight: 600,
                "&:hover": { bgcolor: "#ffb300" },
                px: 3,
              }}
            >
              Logout
            </Button>
          </CardActions>
        </motion.div>
      </Card>
    </Modal>
  );
}
