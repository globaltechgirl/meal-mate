import { Stack, Title, Text } from "@mantine/core";

import AddCustomer from "@/component/home/addcustomer";
import CustomersList from "@/component/home/customerslist";

const Main = () => {
    return (
        <>
            <style>{`
                .custom-input {
                font-size: 10px;
                font-weight: 600;
                width: 100%;
                }

                .custom-input::placeholder {
                font-size: 10px;
                font-weight: 600;
                color: var(--black-200);
                }
            `}</style>

            <Stack
                gap="xl"
                style={{
                    width: "100%",
                    height: "100vh",
                    padding: "1px 24px",
                    backgroundColor: "var(--white)",
                }}
            >
                <Stack gap={4} align="flex-start">
                    <Title order={1} style={{ fontSize: 20, fontWeight: 700 }}>
                        CUSTOMERS
                    </Title>

                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: "var(--black-200)",
                        }}
                    >
                        Manage contracts and agreements for your partner customers
                    </Text>
                </Stack>

                <AddCustomer />

                <CustomersList />
            </Stack>
        </>
    );
};

export default Main;