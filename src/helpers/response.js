const response = {
  success: (res, data, message) => {
    const result = {
      message: message,
      success: true,
      code: 200,
      data: data,
    };
    res.status(200);
    res.json(result);
  },
  successWithMeta: (res, data, meta, message) => {
    const result = {
      message,
      success: true,
      code: 200,
      meta,
      data,
    };
    res.status(200);
    res.json(result);
  },
  failed: (res, data, message) => {
    const result = {
      message: message,
      success: false,
      code: 500,
      data: data,
    };
    res.status(500);
    res.json(result);
  },
  errToken: (res, data, message) => {
    const result = {
      message: message,
      success: true,
      code: 499,
      data: data,
    };
    res.status(499);
    res.json(result);
  },
  forbidden: (res, message) => {
    const result = {
      message: message,
      success: false,
      code: 403,
    };
    res.status(403);
    res.json(result);
  },
};

module.exports = response;
