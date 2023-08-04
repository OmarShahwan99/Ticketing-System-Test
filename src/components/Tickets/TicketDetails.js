import { useNavigate, useParams } from "react-router-dom";
import { Card, Skeleton, Button, notification } from "antd";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import AddRepoert from "./AddRepoert";
import { useDeleteTicket, useTicketDetails } from "../../hooks/useHttp";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reportModalIsOpen, setReportModalIsOpen] = useState(false);

  const { isAdmin } = useContext(AuthContext);

  const { data: ticketDetails, isLoading, error } = useTicketDetails(id);

  const {
    data: deleteData,
    isLoading: deleting,
    error: deleteError,
    mutate: deleteMutation,
  } = useDeleteTicket();

  const deleteTicketHandler = () => {
    deleteMutation(id);
  };

  useEffect(() => {
    if (deleteData) {
      navigate("/");
      notification.open({
        type: "success",
        message: deleteData[0],
      });
    }
  }, [deleteData, navigate]);

  if (deleteError) {
    notification.open({
      type: "error",
      message: deleteError.message,
    });
  }

  if (isLoading) {
    return (
      <div style={{ marginTop: "100px" }}>
        <Card>
          <Skeleton active />
        </Card>
      </div>
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
    <div style={{ marginTop: "100px" }}>
      <Card title={ticketDetails[0].client.name}>
        <p>
          <span style={{ fontWeight: "bold" }}>Id: </span>
          {ticketDetails[0].id}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Email: </span>
          {ticketDetails[0].client.email}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Service: </span>
          {ticketDetails[0].service.title}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Price: </span>
          {ticketDetails[0].service.price}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Status: </span>
          {ticketDetails[0].status.title}
        </p>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Button>
            <Link to="/">Back</Link>
          </Button>
          {isAdmin && (
            <>
              <Button
                onClick={deleteTicketHandler}
                loading={deleting}
                type="primary"
                danger
              >
                Delete
              </Button>
              <Button onClick={() => setReportModalIsOpen(true)} type="primary">
                Add Report
              </Button>
            </>
          )}
        </div>
      </Card>
      <AddRepoert
        isOpen={reportModalIsOpen}
        onCancel={() => setReportModalIsOpen(false)}
        id={id}
      />
    </div>
  );
};

export default TicketDetails;
