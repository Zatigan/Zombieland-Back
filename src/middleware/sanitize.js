import sanitizeHtml from "sanitize-html";

export const sanitizeMiddleware = (req, res, next) => {
  if (!req.body) {
    return next(); 
  }

  
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === "string") {
      req.body[key] = sanitizeHtml(req.body[key]); 
    }
  });

  next(); 
};
