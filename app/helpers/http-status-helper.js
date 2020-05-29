const successMessage = { status: 'success', data: {}, message: "" };
const errorMessage = { status: "error", data: {}, message: "" };

const httpStatus = {
    ok: 200,
    error: 500,
    notFound: 404,
    bad: 400,
    created: 201,
    unauthorized: 401
};
module.exports = { successMessage, errorMessage, httpStatus }