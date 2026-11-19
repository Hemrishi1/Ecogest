import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { authenticator } from "otplib";
import {
  findAdminByEmail,
  generate2FAEnrollment,
  confirmAndEnable2FA,
  verify2FACodeOrRecovery,
  disable2FAForAdmin,
} from "../services/admin.service";

describe("Admin 2FA & TOTP Verification", () => {
  const testAdminEmail = "admin@ecogestindia.com";

  it("should generate enrollment credentials with QR code and secret", async () => {
    const admin = findAdminByEmail(testAdminEmail);
    assert.ok(admin, "Seed admin should exist");

    const enrollment = await generate2FAEnrollment(admin);
    assert.ok(enrollment.secret);
    assert.ok(enrollment.qrCodeUrl.startsWith("data:image/png;base64,"));
    assert.ok(enrollment.otpauthUrl.includes("Ecogest%20India%20Admin"));
  });

  it("should enable 2FA upon valid 6-digit confirmation code and provide 10 recovery codes", async () => {
    const admin = findAdminByEmail(testAdminEmail);
    assert.ok(admin);

    const secret = authenticator.generateSecret();
    const validToken = authenticator.generate(secret);

    const result = confirmAndEnable2FA(admin.id, secret, validToken);
    assert.equal(result.success, true);
    assert.ok(result.plainRecoveryCodes);
    assert.equal(result.plainRecoveryCodes.length, 10);
    assert.ok(result.plainRecoveryCodes[0].startsWith("ECO-"));

    const updated = findAdminByEmail(testAdminEmail);
    assert.equal(updated?.twoFactorEnabled, true);
    assert.ok(updated?.twoFactorSecretEncrypted);
  });

  it("should prevent replay of the same TOTP token in the same 30s window", async () => {
    const admin = findAdminByEmail(testAdminEmail);
    assert.ok(admin);

    // First attempt with the token
    const token = authenticator.generate("TEST_SECRET_FAIL");
    // Verify against current configured secret
    const res = verify2FACodeOrRecovery(admin, "000000"); // wrong code
    assert.equal(res.success, false);

    // Now test replay protection logic: simulate lastTotpWindow matching current window
    const currentWindow = Math.floor(Date.now() / 30000);
    admin.lastTotpWindow = currentWindow;
    const replayCheck = verify2FACodeOrRecovery(admin, "123456");
    assert.equal(replayCheck.success, false);
    assert.ok(replayCheck.error?.includes("already been used"));
  });

  it("should allow login via one-time recovery code and burn the code", async () => {
    const admin = findAdminByEmail(testAdminEmail);
    assert.ok(admin);

    // Re-enroll to get fresh recovery codes
    const secret = authenticator.generateSecret();
    const token = authenticator.generate(secret);
    const setup = confirmAndEnable2FA(admin.id, secret, token);
    const recoveryCode = setup.plainRecoveryCodes![0];

    const updatedAdmin = findAdminByEmail(testAdminEmail)!;
    const initialCodeCount = updatedAdmin.recoveryCodesHashed!.length;

    // Use recovery code
    const verifyResult = verify2FACodeOrRecovery(updatedAdmin, recoveryCode);
    assert.equal(verifyResult.success, true);
    assert.equal(verifyResult.usedRecoveryCode, true);

    // Verify recovery code was burned (consumed)
    const afterUseAdmin = findAdminByEmail(testAdminEmail)!;
    assert.equal(afterUseAdmin.recoveryCodesHashed!.length, initialCodeCount - 1);

    // Second attempt with same recovery code must fail
    const secondAttempt = verify2FACodeOrRecovery(afterUseAdmin, recoveryCode);
    assert.equal(secondAttempt.success, false);
  });

  it("should disable 2FA via recovery CLI function", () => {
    const disabled = disable2FAForAdmin(testAdminEmail);
    assert.equal(disabled, true);

    const admin = findAdminByEmail(testAdminEmail);
    assert.equal(admin?.twoFactorEnabled, false);
    assert.equal(admin?.twoFactorSecretEncrypted, undefined);
  });
});
