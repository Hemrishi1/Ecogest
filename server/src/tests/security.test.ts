import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  stripHeaderInjection,
  escapeHtml,
  encryptAES256GCM,
  decryptAES256GCM,
} from "../utils/security.util";

describe("Security Utilities", () => {
  describe("stripHeaderInjection", () => {
    it("should strip CRLF and control characters from headers", () => {
      const malicious = "Kanhaiya Mali\r\nBcc: evil@attacker.com\x00\x08";
      const cleaned = stripHeaderInjection(malicious);

      assert.ok(!cleaned.includes("\r"));
      assert.ok(!cleaned.includes("\n"));
      assert.ok(!cleaned.includes("\x00"));
      assert.equal(cleaned, "Kanhaiya MaliBcc: evil@attacker.com");
    });

    it("should preserve standard alphanumeric and punctuation characters", () => {
      const normal = "John Doe (Acme Corp.) <john@example.com>";
      assert.equal(stripHeaderInjection(normal), normal);
    });

    it("should handle empty or null values safely", () => {
      assert.equal(stripHeaderInjection(""), "");
    });
  });

  describe("escapeHtml", () => {
    it("should escape XSS HTML entities", () => {
      const unsafe = '<script>alert("XSS & injection")</script>';
      const safe = escapeHtml(unsafe);

      assert.equal(
        safe,
        "&lt;script&gt;alert(&quot;XSS &amp; injection&quot;)&lt;/script&gt;"
      );
    });

    it("should leave plain text intact", () => {
      const plain = "Hello, world! 123 - /";
      assert.equal(escapeHtml(plain), "Hello, world! 123 - /");
    });
  });

  describe("AES-256-GCM Encryption / Decryption", () => {
    it("should accurately encrypt and decrypt a TOTP secret", () => {
      const secret = "JBSWY3DPEHPK3PXP";
      const encrypted = encryptAES256GCM(secret);

      assert.ok(encrypted.includes(":"));
      const parts = encrypted.split(":");
      assert.equal(parts.length, 3); // iv:tag:ciphertext

      const decrypted = decryptAES256GCM(encrypted);
      assert.equal(decrypted, secret);
    });

    it("should produce unique ciphertexts for identical plaintexts (unique IV)", () => {
      const secret = "SECRET_STRING_2026";
      const enc1 = encryptAES256GCM(secret);
      const enc2 = encryptAES256GCM(secret);

      assert.notEqual(enc1, enc2);
      assert.equal(decryptAES256GCM(enc1), secret);
      assert.equal(decryptAES256GCM(enc2), secret);
    });
  });
});
