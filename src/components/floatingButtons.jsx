import { Add, FilterListRounded, SortRounded } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";

export default function FloatingBtns({ handleFilter, handleSort, setOpen }) {
  return (
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
            pointerEvents: "auto",
            scale:{xs:0.9,sm:1},
            width: 72,
            height: 40,
            borderRadius: "999px",

            color: "#92400E",

            background: "linear-gradient(135deg, #FFF7ED, #FFEDD5)",

            boxShadow: "0 6px 14px rgba(0,0,0,0.15)",

            transition: "all 0.25s ease",

            "&:hover": {
              transform: "translateY(-2px) scale(1.05)",
              boxShadow: "0 10px 22px rgba(0,0,0,0.25)",
            },
          }}
        >
          <FilterListRounded />
        </IconButton>
      </Tooltip>

      <Button
        onClick={() => setOpen(true)}
        sx={{
          pointerEvents: "auto",
            scale:{xs:0.9,sm:1},

          width: 64,
          height: 64,
          borderRadius: "50%",

          color: "white",

          background: "linear-gradient(135deg, #F59E0B, #FACC15)",

          // boxShadow: "0 12px 30px rgba(250,204,21,0.55)",

          transition: "all 0.3s ease",

          "& .icon": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.35s ease",
          },

          "&:hover": {
            transform: "translateY(-4px) scale(1.08)",
          },

          "&:hover .icon": {
            transform: "rotate(45deg) scale(1.1)",
          },

          "&:active": {
            transform: "scale(0.95)",
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
            pointerEvents: "auto",
            scale:{xs:0.9,sm:1},

            width: 72,
            height: 40,
            borderRadius: "999px",

            color: "#92400E",

            background: "linear-gradient(135deg, #FFF7ED, #FFEDD5)",

            boxShadow: "0 6px 14px rgba(0,0,0,0.15)",

            transition: "all 0.25s ease",

            "&:hover": {
              transform: "translateY(-2px) scale(1.05)",
              boxShadow: "0 10px 22px rgba(0,0,0,0.25)",
            },
          }}
        >
          <SortRounded />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
