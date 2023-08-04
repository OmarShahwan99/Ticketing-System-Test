import TicketCard from "./TicketCard";

import { Card, List, Button, Skeleton } from "antd";
import { useState } from "react";
import NewTicket from "./NewTicket";
import { useTicketsData } from "../../hooks/useHttp";

const Tickets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useTicketsData();

  let content = (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.client.name}>
            <TicketCard
              status={item.status.title}
              email={item.client.email}
              service={item.service.title}
              price={item.service.price}
              id={item.id}
            />
          </Card>
        </List.Item>
      )}
    />
  );

  if (data) {
    if (data.length === 0) {
      content = (
        <h1>
          There are no tickets!,
          <Button
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#4096ff",
              padding: 0,
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Add one?
          </Button>
        </h1>
      );
    }
  }

  if (isLoading) {
    content = (
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
        }}
        dataSource={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={(item) => (
          <List.Item>
            <Card title="">
              <Skeleton active loading={isLoading} />
            </Card>
          </List.Item>
        )}
      />
    );
  }

  if (error) {
    content = <p>{error.message}</p>;
  }

  return (
    <>
      <div
        style={{
          borderBottom: "1px solid #ccc",
          marginBottom: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <h1>Client Tickets</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          type="primary"
          style={{ fontWeight: "600" }}
        >
          + Create a Ticket
        </Button>
      </div>
      {content}
      <NewTicket isOpen={isModalOpen} onCancel={() => setIsModalOpen(false)} />
    </>
  );
};

export default Tickets;
