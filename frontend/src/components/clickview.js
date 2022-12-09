import axios from "axios";


export const updateView = async (num, postnum) => {
  const res = await axios.post("http://localhost:4000/updateaboardview", {
    num: num,
    postnum: postnum,
  });
  const { result } = res.data;
  return result;
};

