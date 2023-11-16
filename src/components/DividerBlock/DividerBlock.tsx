import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import styles from "./Divider.module.scss";

export const DividerBlock = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.divider}>
      <Divider light>
        <Typography fontSize="12" color="gray">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BackHandOutlinedIcon />
            {t("divider")}
          </Box>
        </Typography>
      </Divider>
    </div>
  );
};
