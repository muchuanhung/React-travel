import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/tripadvisor.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
// 引入HOC高階函數
import { withRouter, RouteComponentProps } from "react-router-dom";
// 引入store倉庫
import store from "../../redux/store";
// 引入語言reducer
import { LanguageState } from "../../redux/languageReducer";
// 繼承languagereducer裡面定義好的state接口
interface State extends LanguageState {}

// 宣告component繼承react.component然後泛型代入routecomponentprops
// 使用store 保存本地變量get.state
class HeaderComponnet extends React.Component<RouteComponentProps, State> {
  // 導入構造函數
  constructor(props) {
    super(props);
    const storeState = store.getState();
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList,
    };
  }
  render() {
    const { history } = this.props;
    return (
      <div className={styles["app-header"]}>
        {/* top-header */}
        <div className={styles["top-header"]}>
          <div className={styles.inner}>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu>
                  {this.state.languageList.map((l) => {
                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                  })}
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {this.state.language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => history.push("register")}>註冊</Button>
              <Button onClick={() => history.push("signin")}>登入</Button>
            </Button.Group>
          </div>
        </div>

        <Layout.Header className={styles["main-header"]}>
          <span onClick={() => history.push("/")}>
            <img src={logo} alt="logo" className={styles["App-logo"]} />
            <Typography.Title level={4} className={styles.title}>
              Holiday Travel
            </Typography.Title>
          </span>

          <Input.Search
            placeholder={"請輸入旅遊目的地、主题、或關鍵字"}
            className={styles["search-input"]}
          />
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles["main-menu"]}>
          <Menu.Item key={1}>團體</Menu.Item>
          <Menu.Item key={2}>機票</Menu.Item>
          <Menu.Item key={3}>訂房</Menu.Item>
          <Menu.Item key="4"> 自由行 </Menu.Item>
          <Menu.Item key="5"> 主題旅遊 </Menu.Item>
          <Menu.Item key="6"> 郵輪 </Menu.Item>
          <Menu.Item key="7"> 酒店+景點 </Menu.Item>
          <Menu.Item key="8"> 當地旅行 </Menu.Item>
          <Menu.Item key="9"> 高鐵旅行 </Menu.Item>
          <Menu.Item key="10"> 票卷旅遊 </Menu.Item>
          <Menu.Item key="11"> 簽證 </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export const Header = withRouter(HeaderComponnet);
