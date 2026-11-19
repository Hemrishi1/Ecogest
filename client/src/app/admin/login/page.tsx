"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, KeyRound, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { authApi } from "@/lib/auth-client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preAuthToken, setPreAuthToken] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [isRecoveryCode, setIsRecoveryCode] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await authApi.login({ email, password });
      if (res.requires2FA && res.preAuthToken) {
        setPreAuthToken(res.preAuthToken);
        setStep("2fa");
      } else {
        router.push("/admin");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await authApi.verify2FA({
        preAuthToken,
        code: totpCode.trim(),
      });
      router.push("/admin");
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid two-factor authentication code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-xl bg-[#1D3D2F] flex items-center justify-center text-white shadow-md">
            <Shield className="w-6 h-6" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-3xl font-serif font-bold text-[#1D3D2F]">
          Ecogest Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure, hardened administrative console
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-stone-200 rounded-xl sm:px-10">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          {step === "credentials" ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@ecogestindia.com"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D3D2F] focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D3D2F] focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1D3D2F] hover:bg-[#152e23] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D3D2F] disabled:opacity-50"
                >
                  {isLoading ? "Authenticating..." : "Sign In"}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handle2FASubmit} className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-[#1D3D2F] mb-3">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Two-Factor Authentication
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {isRecoveryCode
                    ? "Enter one of your 10-character backup recovery codes."
                    : "Enter the 6-digit verification code from your authenticator app."}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {isRecoveryCode ? "Recovery Code" : "6-Digit Security Code"}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    autoFocus
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value)}
                    placeholder={isRecoveryCode ? "ECO-XXXXX-XXXXX" : "123456"}
                    className="block w-full text-center tracking-widest text-lg font-mono py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D3D2F] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1D3D2F] hover:bg-[#152e23] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D3D2F] disabled:opacity-50"
                >
                  {isLoading ? "Verifying..." : "Verify & Continue"}
                  {!isLoading && <CheckCircle2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsRecoveryCode(!isRecoveryCode)}
                  className="text-[#1D3D2F] hover:underline font-medium"
                >
                  {isRecoveryCode ? "Use Authenticator app code" : "Use backup recovery code"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setTotpCode("");
                    setErrorMessage(null);
                  }}
                  className="hover:underline"
                >
                  Back to login
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
