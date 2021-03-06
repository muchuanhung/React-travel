import React from "react";
import styles from "./UserLayout.module.css";
import logo from "../../assets/tripadvisor.svg";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";

const { Header, Footer, Content } = Layout;

export const UserLayout: React.FC = (props) => {
  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  );

  return (
    <Layout className={styles["user-layout-container"]}>
      <video autoPlay muted loop>
        <source
          src="https://res.cloudinary.com/df23zsanf/video/upload/v1654592571/Bike_-_72566_ra0th2.mp4"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>{" "}
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown overlay={menu}>
            <Button>
              {" "}
              選擇語言 <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              <img src={logo} alt="logo" className={styles["logo"]} />
              <span className={styles["title"]}>假期旅遊</span>
            </Link>
          </div>
          {props.children}
        </div>
      </Content>
    </Layout>
  );
};
