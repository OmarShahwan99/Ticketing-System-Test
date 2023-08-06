import { Card, List, Skeleton } from "antd";
import ServiceCard from "./ServiceCard";
import { useServicesData } from "../../hooks/useHttp";

const Services = () => {
  const { data, isLoading, error } = useServicesData();

  if (data) {
    if (data.length === 0) {
      return <h1>There are no services!</h1>;
    }
  }

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
          <Card>
            <ServiceCard id={item.id} title={item.title} price={item.price} />
          </Card>
        </List.Item>
      )}
    />
  );

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
            <Card>
              <Skeleton active loading={isLoading} />
            </Card>
          </List.Item>
        )}
      />
    );
  }

  if (error) {
    return (
      <div style={{ marginTop: "100px" }}>
        <p>{error.message}</p>
      </div>
    );
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
        }}
      >
        <h1>Client Services</h1>
      </div>
      {content}
    </>
  );
};

export default Services;
