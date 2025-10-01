import { Box, Text } from "@mantine/core";
import { type FC } from "react";

import BestImg1 from "@/assets/best-img1.jpg";
import BestImg2 from "@/assets/best-img2.jpg";
import BestImg3 from "@/assets/best-img3.jpg";
import BestImg4 from "@/assets/best-img4.jpg";
import BestImg5 from "@/assets/best-img5.jpg";

interface OrderItem {
  foodName: string;
  image: string;
  placedOn: string;
  quantity: string;
  payment: string;
  orderStatus: "Completed" | "Pending" | "Cancelled";
  amount: string;
}

const recentOrders: OrderItem[] = [
  { foodName: "Burger", image: BestImg1, placedOn: "01-02-25", quantity: "2 pcs", payment: "Paid", orderStatus: "Completed", amount: "$22.00" },
  { foodName: "Chicken", image: BestImg2, placedOn: "02-02-25", quantity: "1 pcs", payment: "Not Paid", orderStatus: "Pending", amount: "$15.00" },
  { foodName: "Pasta", image: BestImg3, placedOn: "03-02-25", quantity: "3 pcs", payment: "Paid", orderStatus: "Completed", amount: "$30.00" },
  { foodName: "Pizza", image: BestImg4, placedOn: "04-02-25", quantity: "1 pcs", payment: "Paid", orderStatus: "Cancelled", amount: "$12.00" },
  { foodName: "Coca Cola", image: BestImg5, placedOn: "05-02-25", quantity: "2 pcs", payment: "Paid", orderStatus: "Completed", amount: "$8.00" },
  { foodName: "Coca Cola", image: BestImg5, placedOn: "05-02-25", quantity: "2 pcs", payment: "Paid", orderStatus: "Completed", amount: "$8.00" },
];

const statusColors: Record<OrderItem["orderStatus"], string> = {
  Completed: "var(--dark-10)",
  Pending: "var(--dark-10)",
  Cancelled: "var(--dark-10)",
};

const styles = {
  wrapper: {
    width: "100%",
    backgroundColor: "var(--dark-20)",
    border: "0.5px solid var(--border-100)",
    borderRadius: 8,
    padding: 10,
    display: "flex",
    flexDirection: "column" as const,
    gap: 15,
  },

  title: {
    fontSize: 10.5,
    fontWeight: 500,
    color: "var(--light-100)",
  },

  gridWrapper: {
    display: "flex",
    flexDirection: "column" as const,
    padding: 12,
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 8,
    width: "100%",
  },

  gridRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 0.5fr",
    alignItems: "center",
    width: "100%",
    columnGap: 12,
    justifyItems: "stretch",
  },

  headerText: {
    fontSize: 9.5,
    fontWeight: 450,
    color: "var(--light-100)",
  },

  rowText: {
    fontSize: 9,
    fontWeight: 400,
    color: "var(--light-200)",
  },

  foodInfo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  foodImage: {
    width: 30,
    height: 30,
    borderRadius: 6,
    objectFit: "cover" as const,
  },

  statusBox: (status: OrderItem["orderStatus"]) => ({
    padding: "3px 6px",
    width: "fit-content",
    borderRadius: 6,
    backgroundColor: statusColors[status],
    fontSize: 8.5,
    fontWeight: 400,
    color: "var(--light-200)",
    textAlign: "center" as const,
  }),
  hr: {
    border: "0.5px solid var(--dark-20)",
    margin: "8px 0",
  },
};

const OrderRow: FC<{ order: OrderItem }> = ({ order }) => (
  <Box style={styles.gridRow}>
    <Box style={styles.foodInfo}>
      <img src={order.image} alt={order.foodName} style={styles.foodImage} />
      <Text style={styles.rowText}>{order.foodName}</Text>
    </Box>
    <Text style={styles.rowText}>{order.placedOn}</Text>
    <Text style={styles.rowText}>{order.quantity}</Text>
    <Text style={styles.rowText}>{order.payment}</Text>
    <Box style={styles.statusBox(order.orderStatus)}>{order.orderStatus}</Box>
    <Text style={styles.rowText}>{order.amount}</Text>
  </Box>
);

const RecentList: FC = () => (
  <Box style={styles.wrapper}>
    <Text style={styles.title}>Recent List</Text>

    <Box style={styles.gridWrapper}>
      <Box style={styles.gridRow}>
        <Text style={styles.headerText}>Item</Text>
        <Text style={styles.headerText}>Placed On</Text>
        <Text style={styles.headerText}>Quantity</Text>
        <Text style={styles.headerText}>Payment</Text>
        <Text style={styles.headerText}>Order Status</Text>
        <Text style={styles.headerText}>Amount</Text>
      </Box>

      <hr style={styles.hr} />

      {recentOrders.slice(0, 5).map((order, index) => (
        <Box key={index}>
          <OrderRow order={order} />
          {index < 4 && <hr style={styles.hr} />}
        </Box>
      ))}
    </Box>
  </Box>
);

export default RecentList;
