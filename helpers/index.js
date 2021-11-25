import cookie from "cookie";

const parseCookies = (req) => {
    return cookie.parse(req ? req.headers.cookie || "token=''" : "token=''");
};

export default parseCookies;
