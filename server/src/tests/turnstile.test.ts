import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../index";

describe("Bot Protection & Honeypot Integration", () => {
  it("should silently discard submission and return fake success when honeypot is filled", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({
        name: "Bot User",
        email: "bot@spammer.com",
        phone: "+91 9876543210",
        message: "Spam content",
        privacyConsent: true,
        honeypot: "spam_link_filled", // honeypot populated
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.message.includes("received"));
  });

  it("should reject contact submission when Turnstile token is invalid", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({
        name: "Real User",
        email: "real@example.com",
        phone: "+91 9876543210",
        message: "Hello world",
        privacyConsent: true,
        turnstileToken: "INVALID_TEST_TOKEN_REJECT",
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  it("should reject submission when Turnstile token is completely missing", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({
        name: "Real User",
        email: "real@example.com",
        phone: "+91 9876543210",
        message: "Hello world",
        privacyConsent: true,
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });
});
