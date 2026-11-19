import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../index";

describe("CSRF Protection Middleware", () => {
  it("should reject POST /api/auth/login without X-Requested-With header", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@ecogestindia.com",
        password: "EcogestAdmin2026!",
      });

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.ok(res.body.message.includes("CSRF"));
  });

  it("should reject POST with incorrect custom header", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("X-Requested-With", "XMLHttpRequest")
      .send({
        email: "admin@ecogestindia.com",
        password: "EcogestAdmin2026!",
      });

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.ok(res.body.message.includes("CSRF"));
  });

  it("should allow POST with valid X-Requested-With: ecogest-admin header", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("X-Requested-With", "ecogest-admin")
      .send({
        email: "admin@ecogestindia.com",
        password: "EcogestAdmin2026!",
      });

    // Should proceed past CSRF guard (status 200)
    assert.notEqual(res.status, 403);
  });
});
