// import jwt from "jsonwebtoken";
// import { JWTPRIVATKEY } from "../util/secrets";
//  export const isAuthenticated = (req, res, next)=>{
//     try {
//         const token = req.headers.authorization;
//         const decodedToken = jwt.verify(token, JWTPRIVATKEY);
//         req.token = decodedToken;
//         next();
//       } catch {
//         res.status(403).json({
//           error: "Invalid request!"
//         });
//     }
// };
// export const isAdmin = (req, res, next)=>{
//   try {
//       const token = req.headers.authorization;
//       const decodedToken = jwt.verify(token, JWTPRIVATKEY);
//       if(decodedToken.role && decodedToken.role === "admin"){
//           req.token = decodedToken;
//           next();
//       }else{
//           res.status(403).json({
//               error: "Permission denied!"
//           });
//       }
//     } catch {
//       res.status(403).json({
//         error: "Invalid request!"
//       });
//   }
// };
// export default isAuthenticated;
//# sourceMappingURL=auth.js.map