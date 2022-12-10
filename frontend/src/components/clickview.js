import axios from "axios";


export const updateView = async (num, postnum) => {
  const res = await axios.post("http://localhost:4000/updateaboardview", {
    num: num,
    postnum: postnum,
  });
  const { result } = res.data;
  return result;
};

export const updatedisView = async (num, t_id) => {
  const res = await axios.post("http://localhost:4000/updatedisview", {
    num: num,
    t_id: t_id,
  });
  const { result } = res.data;
  return result;
};
