const appError = (message, statusCode) {
    const error = new error(message);
    error.statusCode = statusCode;
    error.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    error.isOperational = true;
    return error;
}

module.exports = appError;