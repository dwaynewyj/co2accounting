import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = responsiveFontSizes(
  createTheme({
    display: {
      center: "center",
      flex: "flex",
      block: "block",
    },
    justifyContent: {
      center: "center",
      left: "left",
      right: "right",
      start: "flex-start",
      end: "flex-end",
    },
    alignItems: {
      center: "center",
      start: "flex-start",
      right: "right",
      end: "flex-end",
    },
    typography: {
      fontFamily: ["montserrat"].join(","),
    },
    components: {
      MuiGrid: {
        styleOverrides: {
          root: {
            "&.centered": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
        },
        variants: [
          {
            props: { variant: "inv-report-card" },
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: "100%",
              padding: 10,
              border: "1px solid #D9D9D9",
              borderRadius: 10,
              gap: 20,
              "&:hover": {
                cursor: "pointer",
                background:
                  "var(--4699CF---4673C4, linear-gradient(270deg, #4699CF 0%, #4673C4 100%))",
                "& .hover-child": {
                  color: "white",
                },
              },
            },
          },
        ],
      },
      MuiTypography: {
        styleOverrides: { root: { fontFamily: "montserrat", fontSize: 12 } },
        variants: [
          { props: { size: "lg" }, style: { fontSize: 32 } },
          { props: { size: "md" }, style: { fontSize: 16 } },
          { props: { size: "sm" }, style: { fontSize: 12 } },
          {
            props: { variant: "title" },
            style: {
              fontWeight: 700,
              color: "#4690CD",
            },
          },
          {
            props: { variant: "title-secondary" },
            style: {
              fontWeight: 500,
              color: "#999E9F",
            },
          },
          {
            props: { variant: "subtitle" },
            style: {
              fontWeight: 900,
              color: "#999E9F",
            },
          },
          {
            props: { variant: "counter" },
            style: {
              padding: "0.125rem 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 100,
              fontWeight: 500,
              color: "white",
              borderRadius: 99,
              background:
                "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",
            },
          },
        ],
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: 12,
            fontFamily: "montserrat",
            fontWeight: 900,
            padding: "0 1.5rem",
            height: 33,
            borderRadius: 100,
            border: "none",
            background:
              "transparent linear-gradient(118deg, #4699CF 0%, #4673C4 100%) 0% 0% no-repeat padding-box",
            color: "white",
            textWrap: "nowrap",
            textTransform: "none",
            ":hover": { opacity: 0.6 },
            ":disabled": {
              background: "grey",
              color: "white",
            },
            "& .MuiButton-endIcon": {
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            },
          },
        },
        variants: [
          {
            props: { size: "lg" },
            style: { minWidth: 250, fontSize: 16 },
          },
          {
            props: { size: "md" },
            style: { minWidth: 250 },
          },
          {
            props: { size: "sm" },
            style: { minWidth: 200 },
          },
          {
            props: { variant: "secondary" },
            style: {
              background: "#D9D9D9",
              color: "#404040",
              ":hover": { opacity: 0.7 },
            },
          },
        ],
      },
    },
  }),
);

export default theme;
