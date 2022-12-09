import axios from "axios";
import { getTokenFromCookie } from "../components/Auth";

export const updateRecentStock = async (code) => {
  const token = getTokenFromCookie();
  console.log(token);
  const res = await axios.get("http://localhost:4000/updateRecentStock", {
    headers: { token: token },
    params: { code: code },
  });
  const { result } = res.data;
  return result;
};