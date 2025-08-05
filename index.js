import express from 'express';
import cors from "cors";
import Hello from './Hello.js'
import Lab5 from './Lab5/index.js';
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';
const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:5173",
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "lax",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
// app.use((req, res, next) => {
//     console.log(`🌐 ${new Date().toISOString()} - ${req.method} ${req.url}`);
//     console.log(`🍪 Cookies: ${req.headers.cookie || 'NO COOKIES'}`);
//     console.log(`🎯 Session ID: ${req.sessionID || 'NO SESSION ID'}`);
//     next();
// });
UserRoutes(app)
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Lab5(app)
Hello(app)
app.listen(process.env.PORT || 4000);