import { useState } from "react";
import { Modal, Input, notification } from "antd";
import { useQueryClient } from "react-query";
import { useAddTicket } from "../../hooks/useHttp";

const NewTicket = (props) => {
  const [etneredSrvId, setEnteredSrvId] = useState("");

  const queryClient = useQueryClient();

  const { mutate: addTicketMutation, isLoading, error } = useAddTicket();

  const addNewTicketHandler = () => {
    addTicketMutation(etneredSrvId, {
      onSuccess: () => {
        queryClient.invalidateQueries("tickets");
        props.onCancel();
        notification.open({
          type: "success",
          message: "Ticket created successfully",
        });
      },
      onError: () => {
        notification.open({
          type: "error",
          message: error.message,
        });
      },
    });
  };

  return (
    <>
      <Modal
        title="Add a new ticket"
        open={props.isOpen}
        onOk={addNewTicketHandler}
        confirmLoading={isLoading}
        onCancel={props.onCancel}
        okText="Add"
      >
        <Input
          onChange={(e) => setEnteredSrvId(e.target.value)}
          placeholder="Service id (1 or 2)"
        />
      </Modal>
    </>
  );
};
export default NewTicket;
