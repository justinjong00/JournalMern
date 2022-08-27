import axios from "axios";

const API_URL = "/api/entries/";

// Create new goal
const createEntry = async (entryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, entryData, config);

  return response.data;
};

// Get user goals
const getEntries = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user entry
const deleteEntry = async (entryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + entryId, config);

  return response.data;
};

const entryService = {
  createEntry,
  getEntries,
  deleteEntry,
};

export default entryService;
