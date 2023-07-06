import { Button, Col, Drawer, Row } from "antd";
import React, { FC, Fragment, memo } from "react";
import { OrderDetailsProps } from ".";
import Span from "./Span";
import convertPrice from "~/utils/convert-price";
import { ProductsLabel, ProductsTable, TBody, THead } from "./styled";
import { OrderStatus } from "~/shared";
import {
  approveOrder,
  beginShipOrder,
  rejectOrder,
  useAppDispatch,
} from "~/redux";
import { toast } from "react-toastify";

const ViewOrder: FC<{
  order: OrderDetailsProps;
  viewOrder: boolean;
  handleViewOrder: (status: boolean) => void;
}> = ({ order, viewOrder, handleViewOrder }) => {
  const dispatch = useAppDispatch();

  const handleApprove = async (id: string) => {
    const result = await dispatch(approveOrder(id));

    if (approveOrder.fulfilled.match(result)) {
      handleViewOrder(false);
      toast.success("Approve Order Successfully");
    }
  };

  const handleReject = async (id: string) => {
    const result = await dispatch(rejectOrder(id));

    if (rejectOrder.fulfilled.match(result)) {
      handleViewOrder(false);
      toast.success("Reject Order Successfully");
    }
  };

  const handleBeginShipping = async (id: string) => {
    const result = await dispatch(beginShipOrder(id));

    if (beginShipOrder.fulfilled.match(result)) {
      handleViewOrder(false);
      toast.success("Begin Shipping Successfully");
    }
  };

  const controlRender = (status: string) => {
    switch (status) {
      case OrderStatus.Processing:
        return (
          <div
            style={{
              marginTop: 10,
            }}
          >
            <Button
              type="primary"
              style={{
                marginRight: 10,
              }}
              onClick={() => handleApprove(order.id)}
            >
              Approve
            </Button>
            <Button onClick={() => handleReject(order.id)}>Reject</Button>
          </div>
        );
      case OrderStatus.Approved:
        return (
          <div
            style={{
              marginTop: 10,
            }}
          >
            <Button
              type="primary"
              style={{
                marginRight: 10,
              }}
              onClick={() => handleBeginShipping(order.id)}
            >
              Begin Shipping
            </Button>
            <Button onClick={() => handleReject(order.id)}>
              Product Not Available
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer
      title="View Order Details"
      placement="right"
      open={viewOrder}
      onClose={() => handleViewOrder(false)}
      width={1200}
    >
      <Row gutter={24}>
        <Col span={5}>
          <Span label="Order ID" value={order.id} />
        </Col>

        <Col span={5}>
          <Span
            label="Estimated Shipped Date"
            value={order.estimated_shipped_date.toString()}
          />
        </Col>

        <Col span={5}>
          <Span label="Total" value={convertPrice(order.total)} />
        </Col>
        <Col span={5}>
          <Span label="Status" value={order.status} />
        </Col>
        <Col span={4}>
          <Span label="Payment" value={order.payment} />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={5}>
          <Span label="Create At" value={order.created_at.toString()} />
        </Col>
        <Col span={5}>
          <Span
            label="Approved Date"
            value={order.approved_date ? order.approved_date.toString() : "N/A"}
          />
        </Col>
        <Col span={5}>
          <Span
            label="Shipped Date"
            value={order.shipped_date ? order.shipped_date.toString() : "N/A"}
          />
        </Col>
        <Col span={5}>
          <Span
            label="Canceled Date"
            value={order.canceled_date ? order.canceled_date.toString() : "N/A"}
          />
        </Col>
        <Col span={4}>
          <Span
            label="Return Date"
            value={order.return_date ? order.return_date.toString() : "N/A"}
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}>
          <Span label="Receiver Name" value={order.address.name} />
        </Col>
        <Col span={6}>
          <Span label="Receiver Phone" value={order.address.phone} />
        </Col>
        <Col span={12}>
          <Span
            label="Delivery address"
            value={`${order.address.street}, ${order.address.ward}, ${order.address.city}, ${order.address.district}`}
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <ProductsLabel>Product List</ProductsLabel>
          <ProductsTable>
            <THead>
              <tr>
                <th>No.</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </THead>
            <TBody>
              {order.order_details.map((orderDetail, index) => (
                <Fragment key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{orderDetail.product.name}</td>
                    <td>{convertPrice(orderDetail.product.price)}</td>
                    <td>{orderDetail.quantity}</td>
                  </tr>
                </Fragment>
              ))}
            </TBody>
          </ProductsTable>
        </Col>
      </Row>
      {controlRender(order.status)}
    </Drawer>
  );
};

export default memo(ViewOrder);
