import { useQuery, useMutation } from "react-query";
import axios from "axios";

const fetchTickets = async () => {
  try {
    const response = await axios.get(
      "https://assignments.aigate.me/backend_technical_test/public/api/get-tickets",
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    const responseData = await response.data;
    return responseData.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const onDeleteTicket = async (ticketId) => {
  const response = await axios.delete(
    `https://assignments.aigate.me/backend_technical_test/public/api/delete-ticket/${ticketId}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return await response.data;
};

const onAddTicket = async (srvId) => {
  const response = await axios.post(
    "https://assignments.aigate.me/backend_technical_test/public/api/create-ticket",
    { service_id: srvId },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return response;
};

const onAddReport = async (reportData) => {
  const response = await axios.post(
    "https://assignments.aigate.me/backend_technical_test/public/api/add-report",
    reportData,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return response;
};

const onLogin = async (formData) => {
  const response = await axios.post(
    "https://assignments.aigate.me/backend_technical_test/public/api/login",
    formData
  );
  return response;
};

const onRegister = async (formData) => {
  const response = await axios.post(
    "https://assignments.aigate.me/backend_technical_test/public/api/register",
    formData
  );
  return response;
};

const onLogout = async () => {
  const response = await axios.delete(
    "https://assignments.aigate.me/backend_technical_test/public/api/logout",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response;
};

export const useTicketsData = () => {
  return useQuery("tickets", fetchTickets);
};

export const useTicketDetails = (id) => {
  return useQuery("ticket", async () => {
    const response = await axios.get(
      `https://assignments.aigate.me/backend_technical_test/public/api/view-ticket/${id}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return await response.data;
  });
};

export const useDeleteTicket = () => {
  return useMutation(onDeleteTicket);
};

export const useAddTicket = () => {
  return useMutation(onAddTicket);
};

export const useAddReport = () => {
  return useMutation(onAddReport);
};

export const useLogin = () => {
  return useMutation(onLogin);
};

export const useRegister = () => {
  return useMutation(onRegister);
};

export const useLogout = (onSuccess) => {
  return useMutation(onLogout, { onSuccess });
};
