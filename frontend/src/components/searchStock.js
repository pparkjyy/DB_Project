import axios from "axios";

export const searchStock = async (searchWord) => {
  const res = await axios.get("http://localhost:4000/searchstock", {
    params: { searchWord: searchWord },
  });
  const result = res.data;
  console.log(result);
  return result;
};
