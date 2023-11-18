import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import styles from "./DividerBlock.module.scss";

export const DividerBlock = () => {
  const { t } = useTranslation();

  return (
    <Box className={styles.dividerWrapper}>
      <Divider light>
        <Typography fontSize="12" color="gray">
          <Box className={styles.dividerBox}>
            <BackHandOutlinedIcon />
            {t(`${translatePath.divider}.divider_item`)}
          </Box>
        </Typography>
      </Divider>
    </Box>
  );
};
