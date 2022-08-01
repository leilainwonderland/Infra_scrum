interface HttpError extends Error{
    status:number,
}
const err = new Error() as HttpError;

const ifError = (msg: string, code: number) => {
  err.message = msg;
  err.status = code;
};

export { HttpError, ifError, err };
