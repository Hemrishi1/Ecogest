import { disable2FAForAdmin, findAdminByEmail } from "../services/admin.service";
import { logAuditEvent } from "../services/audit.service";

async function main() {
  const args = process.argv.slice(2);
  let email = "admin@ecogestindia.com";

  for (const arg of args) {
    if (arg.startsWith("--email=")) {
      email = arg.split("=")[1].trim();
    } else if (!arg.startsWith("--") && arg.includes("@")) {
      email = arg.trim();
    }
  }

  console.log(`[Reset-2FA] Attempting to reset 2FA for: ${email}`);

  const admin = findAdminByEmail(email);
  if (!admin) {
    console.error(`[Reset-2FA] Error: Admin user with email "${email}" not found.`);
    process.exit(1);
  }

  const success = disable2FAForAdmin(email);
  if (success) {
    logAuditEvent({
      event: "2fa_reset",
      result: "success",
      adminEmail: email,
      details: { executedBy: "CLI reset-2fa script" },
    });
    console.log(`[Reset-2FA] Success! 2FA has been disabled for ${email}.`);
    console.log(`[Reset-2FA] The admin can now log in using password only and re-enroll in 2FA.`);
  } else {
    console.error(`[Reset-2FA] Failed to reset 2FA for ${email}.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("[Reset-2FA] Unexpected error:", err);
  process.exit(1);
});
