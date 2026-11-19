"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  QrCode,
  Copy,
  Check,
  AlertTriangle,
  ArrowRight,
  LogOut,
  Download,
} from "lucide-react";
import { authApi } from "@/lib/auth-client";

export default function AdminSecurityPage() {
  const router = useRouter();

  const [admin, setAdmin] = useState<{
    id: string;
    email: string;
    twoFactorEnabled: boolean;
  } | null>(null);

  const [enrollmentData, setEnrollmentData] = useState<{
    secret: string;
    qrCodeUrl: string;
  } | null>(null);

  const [confirmCode, setConfirmCode] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedCodes, setCopiedCodes] = useState(false);

  useEffect(() => {
    loadSecurityStatus();
  }, []);

  const loadSecurityStatus = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const meRes = await authApi.getMe();
      setAdmin(meRes.admin);

      if (!meRes.admin.twoFactorEnabled) {
        startEnrollmentFlow();
      }
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        router.push("/admin/login");
      } else {
        setErrorMessage(err.message || "Failed to load account security state.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startEnrollmentFlow = async () => {
    try {
      const res = await authApi.generate2FA();
      setEnrollmentData({
        secret: res.secret,
        qrCodeUrl: res.qrCodeUrl,
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to initialize 2FA enrollment credentials.");
    }
  };

  const handleConfirmCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentData) return;

    setErrorMessage(null);
    setIsEnrolling(true);

    try {
      const res = await authApi.enable2FA({
        secret: enrollmentData.secret,
        code: confirmCode.trim(),
      });

      setRecoveryCodes(res.recoveryCodes);
      setAdmin((prev) => (prev ? { ...prev, twoFactorEnabled: true } : null));
      setEnrollmentData(null);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to verify 6-digit confirmation code.");
    } finally {
      setIsEnrolling(false);
    }
  };

  const copyToClipboard = (text: string, type: "secret" | "codes") => {
    navigator.clipboard.writeText(text);
    if (type === "secret") {
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
    } else {
      setCopiedCodes(true);
      setTimeout(() => setCopiedCodes(false), 2000);
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl text-[#1D3D2F]">Ecogest</span>
              <span className="text-xs bg-stone-100 text-stone-600 font-medium px-2 py-0.5 rounded border border-stone-300">
                Admin
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-sm">
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Submissions
              </Link>
              <Link
                href="/admin/security"
                className="px-3 py-1.5 rounded-lg bg-[#1D3D2F]/10 text-[#1D3D2F] font-semibold"
              >
                Security & 2FA
              </Link>
              <Link
                href="/admin/audit"
                className="px-3 py-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Audit Logs
              </Link>
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs text-red-700 hover:text-red-900 px-3 py-1.5 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            Account Security & Two-Factor Authentication
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Industry-standard TOTP two-factor authentication and encrypted recovery codes
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Status Card */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {admin?.twoFactorEnabled ? (
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              )}
              <div>
                <h2 className="text-base font-semibold text-stone-900">
                  {admin?.twoFactorEnabled
                    ? "Two-Factor Authentication is Enabled"
                    : "Two-Factor Authentication is NOT Enabled"}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {admin?.twoFactorEnabled
                    ? "Your account requires an authenticator app code on every login session."
                    : "Enabling 2FA adds an essential layer of security to prevent unauthorized access."}
                </p>
              </div>
            </div>

            {admin?.twoFactorEnabled && (
              <button
                onClick={() => {
                  setRecoveryCodes(null);
                  startEnrollmentFlow();
                }}
                className="text-xs text-[#1D3D2F] font-semibold border border-stone-300 hover:bg-stone-50 px-3 py-1.5 rounded-lg"
              >
                Re-enroll 2FA
              </button>
            )}
          </div>
        </div>

        {/* Display Recovery Codes Screen if Just Enabled */}
        {recoveryCodes && (
          <div className="bg-white rounded-xl border border-emerald-300 p-6 shadow-sm mb-6">
            <div className="flex items-start gap-3 pb-4 border-b border-stone-100">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-800">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Save Your One-Time Recovery Codes
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  If you ever lose access to your authenticator app, these 10 one-time recovery codes are the only way to log back into your admin account. Store them safely.
                </p>
                <div className="mt-2 text-xs font-semibold text-red-600 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  These codes will NOT be displayed again!
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2.5 bg-stone-50 p-4 rounded-lg font-mono text-xs text-stone-800 font-semibold border border-stone-200">
              {recoveryCodes.map((code, idx) => (
                <div key={idx} className="bg-white p-2 rounded border border-stone-200 text-center select-all">
                  {code}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => copyToClipboard(recoveryCodes.join("\n"), "codes")}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 bg-white hover:bg-stone-50"
              >
                {copiedCodes ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copiedCodes ? "Copied all codes!" : "Copy all recovery codes"}
              </button>

              <button
                onClick={() => setRecoveryCodes(null)}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-[#1D3D2F] text-white hover:bg-[#152e23]"
              >
                I have saved these codes safely
              </button>
            </div>
          </div>
        )}

        {/* Enrollment Step */}
        {enrollmentData && (
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#1D3D2F]" />
              Setup Two-Factor Authentication
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Step 1: Scan QR */}
              <div className="space-y-4">
                <p className="text-xs text-stone-600 leading-relaxed">
                  1. Scan this QR code using Google Authenticator, Microsoft Authenticator, 1Password, or Authy on your mobile phone:
                </p>

                <div className="flex justify-center p-3 bg-white border border-stone-200 rounded-lg w-fit shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={enrollmentData.qrCodeUrl}
                    alt="2FA QR Code"
                    width={180}
                    height={180}
                    className="block"
                  />
                </div>

                <div className="pt-2">
                  <span className="text-[11px] text-stone-500 block mb-1">
                    Or enter this manual secret key into your authenticator app:
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs bg-stone-50 p-2 rounded border border-stone-200 select-all">
                    <span className="truncate flex-1">{enrollmentData.secret}</span>
                    <button
                      onClick={() => copyToClipboard(enrollmentData.secret, "secret")}
                      className="text-stone-500 hover:text-stone-800 p-1"
                      title="Copy Secret"
                    >
                      {copiedSecret ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2: Confirm 6-Digit Code */}
              <form onSubmit={handleConfirmCode} className="space-y-4 border-t md:border-t-0 md:border-l border-stone-100 md:pl-8">
                <p className="text-xs text-stone-600 leading-relaxed">
                  2. Enter the 6-digit confirmation code shown in your authenticator app to verify setup and activate 2FA:
                </p>

                <div>
                  <input
                    type="text"
                    required
                    value={confirmCode}
                    onChange={(e) => setConfirmCode(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    className="w-full text-center tracking-widest text-xl font-mono py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D3D2F]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isEnrolling || confirmCode.length < 6}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#1D3D2F] text-white hover:bg-[#152e23] font-medium text-xs shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isEnrolling ? "Verifying..." : "Verify & Enable 2FA"}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-stone-400 text-center">
                  Once enabled, the secret will be encrypted using AES-256-GCM.
                </p>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
