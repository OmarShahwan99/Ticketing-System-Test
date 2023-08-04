import { Button } from "antd";
import { Link } from "react-router-dom";
const TicketCard = (props) => (
  <>
    <p>
      <span style={{ fontWeight: "bold" }}>Email:</span> {props.email}
    </p>
    <p>
      <span style={{ fontWeight: "bold" }}>Service:</span> {props.service}
    </p>
    <p>
      <span style={{ fontWeight: "bold" }}>Price:</span> ${props.price}
    </p>
    <p>
      <span
        style={{
          fontWeight: "bold",
        }}
      >
        Status:
      </span>{" "}
      <span style={{ color: props.status === "pending" ? "orange" : "blue" }}>
        {props.status}
      </span>
    </p>
    <div style={{ textAlign: "right", marginTop: "10px" }}>
      <Button>
        <Link to={`/${props.id}`}>View Details</Link>
      </Button>
    </div>
  </>
);

export default TicketCard;
