import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

import { useAddReport } from "../../hooks/useHttp";

const AddRepoert = (props) => {
  const [report, setReport] = useState("");

  const queryClient = useQueryClient();

  const { mutate: addReportMutation, isLoading, error, data } = useAddReport();

  const addReportHandler = () => {
    const reportData = {
      report: report,
      ticket_id: props.id,
    };
    addReportMutation(reportData, {
      onSuccess: () => {
        props.onCancel();
        queryClient.invalidateQueries("ticket");
      },
    });
  };

  useEffect(() => {
    if (data) {
      notification.open({
        type: "success",
        message: data.data.message,
        duration: 2,
      });
    }
  }, [data]);

  if (error) {
    notification.open({
      type: "error",
      message: error.message,
    });
  }

  return (
    <Modal
      title="Add a report"
      open={props.isOpen}
      onCancel={props.onCancel}
      confirmLoading={isLoading}
      onOk={addReportHandler}
      okText="Add"
    >
      <Input
        onChange={(e) => setReport(e.target.value)}
        placeholder="Report Description"
      />
    </Modal>
  );
};

export default AddRepoert;
