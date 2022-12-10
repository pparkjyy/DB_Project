export const fail = (CODE, MESSAGE) => {
  return { code: CODE, msg: MESSAGE };
};

export function toSqlDatetime (date){
  const dateWithOffest = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return dateWithOffest.toISOString().slice(0, 19).replace("T", " ");
};
export function toSqltime (date){
  const dateWithOffest = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return dateWithOffest.toISOString().slice(11, 19).replace("T", " ");
};