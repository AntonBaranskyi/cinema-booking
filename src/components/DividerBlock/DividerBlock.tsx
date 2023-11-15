import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import { Box, Divider, Typography } from "@mui/material";

import styles from "./Divider.module.scss";

export const DividerBlock = () => {
  return (
    <Divider className={styles.divider} light sx={{ marginBottom: "40px" }}>
      <Typography fontSize="12" color="gray">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BackHandOutlinedIcon />
          Click on a time of the seccion to choose a place
        </Box>
      </Typography>
    </Divider>
  );
};
