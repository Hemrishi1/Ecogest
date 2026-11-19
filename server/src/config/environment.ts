import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  smtp: {
    host: process.env.SMTP_HOST || "smtp.example.com",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.EMAIL_FROM || '"Ecogest India" <noreply@ecogestindia.com>',
    to: process.env.EMAIL_TO || "kanhaiya.mali@ecogestindia.com",
  },
  dataPath: path.resolve(__dirname, "../../data/submissions.json"),
};
