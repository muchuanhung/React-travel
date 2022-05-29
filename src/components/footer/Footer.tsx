import React from "react";
import { Layout, Typography } from "antd";
import { useTranslation, withTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout.Footer>
      <Typography.Title
        level={5}
        style={{ textAlign: "center", fontFamily: "sans-serif" }}
      >
        {t("footer.detail")}
      </Typography.Title>
    </Layout.Footer>
  );
};
