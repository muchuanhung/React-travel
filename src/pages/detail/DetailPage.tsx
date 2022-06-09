import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
// 商品內頁詳情引用Api調用
import axios from "axios";
// 導入日期組件
import {
  Spin,
  Row,
  Col,
  Divider,
  Typography,
  DatePicker,
  Space,
  Anchor,
  Menu,
  Button,
} from "antd";
import styles from "./DetailPage.module.css";
import {
  Header,
  Footer,
  ProductIntro,
  ProductComments,
} from "../../components";

import { commentMockData } from "./mockup";
import {
  productDetailSlice,
  getProductDetail,
} from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layouts/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";
import ScrollToTop from "react-scroll-to-top";

const { RangePicker } = DatePicker;

interface MatchParams {
  touristRouteId: string;
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (
  props
) => {
  const { touristRouteId } = useParams<MatchParams>();
  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);

  const dispatch = useDispatch();

  const jwt = useSelector((s) => s.user.token) as string;
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);

  useEffect(() => {
    dispatch(getProductDetail(touristRouteId));
  }, []);
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          margin: "200 auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>網站錯誤：{error}</div>;
  }
  return (
    <MainLayout>
      <ScrollToTop />
      {/* Product_content & Date_picker */}
      <div className={styles["product-intro-container"]}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title={product.title}
              shortDescription={product.description}
              price={product.originalPrice}
              coupons={product.coupons}
              points={product.points}
              discount={product.price}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((p) => p.url)}
            />
          </Col>
          <Col span={11}>
            <Button
              style={{ marginTop: 50, marginBottom: 30, display: "block" }}
              type="primary"
              danger
              loading={shoppingCartLoading}
              onClick={() => {
                dispatch(
                  addShoppingCartItem({ jwt, touristRouteId: product.id })
                );
              }}
            >
              <ShoppingCartOutlined />
              放入購物車
            </Button>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* 锚点菜单 */}
      <Anchor className={styles["product-detail-anchor"]}>
        <Menu mode="horizontal" className={styles["product-detail-label"]}>
          <Menu.Item key="1">
            <Anchor.Link href="#feature" title="產品特色"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Anchor.Link href="#fees" title="費用"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Anchor.Link href="#notes" title="預定須知"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Anchor.Link href="#comments" title="用户評價"></Anchor.Link>
          </Menu.Item>
        </Menu>
      </Anchor>{" "}
      {/* 產品特色 */}
      <div id="feature" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>產品特色</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.features }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 費用 */}
      <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>費用</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.fees }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 預定須知 */}
      <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>预定須知</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.notes }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 商品評價*/}
      <div id="comments" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>用户評價</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
    </MainLayout>
  );
};