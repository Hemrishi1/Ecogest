"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  FileSpreadsheet,
  RefreshCw,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Filter,
} from "lucide-react";
import { authApi } from "@/lib/auth-client";

interface AuditLog {
  id: string;
  timestamp: string;
  event: string;
  result: "success" | "failure";
  adminEmail?: string;
  ip?: string;
  userAgent?: string;
  details?: Record<string, any>;
}

export default function AdminAuditPage() {
  const router = useRouter();

  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [eventFilter, setEventFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadAuditLogs();
  }, [eventFilter, page]);

  const loadAuditLogs = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await authApi.getAuditLogs({
        page,
        limit: 25,
        event: eventFilter || undefined,
      });

      setLogs(res.logs);
      setTotalPages(res.pagination.totalPages);
      setTotalCount(res.pagination.total);
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        router.push("/admin/login");
      } else {
        setErrorMessage(err.message || "Failed to fetch audit log entries.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      {/* Header */}
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
                className="px-3 py-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Security & 2FA
              </Link>
              <Link
                href="/admin/audit"
                className="px-3 py-1.5 rounded-lg bg-[#1D3D2F]/10 text-[#1D3D2F] font-semibold"
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-900">Security Audit Trail</h1>
            <p className="text-xs text-stone-500 mt-1">
              Immutable, append-only security event logs ({totalCount} total entries)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={eventFilter}
                onChange={(e) => {
                  setEventFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent text-stone-700 focus:outline-none text-xs cursor-pointer"
              >
                <option value="">All Events</option>
                <option value="login">Login</option>
                <option value="2fa_verify">2FA Verify</option>
                <option value="2fa_enroll">2FA Enrolled</option>
                <option value="2fa_reset">2FA Reset</option>
                <option value="lockout">Account Lockout</option>
                <option value="submission_view">Submission View</option>
                <option value="submission_delete">Submission Delete</option>
                <option value="retention_purge">Data Retention Purge</option>
                <option value="logout">Logout</option>
              </select>
            </div>

            <button
              onClick={() => loadAuditLogs()}
              disabled={isLoading}
              title="Refresh logs"
              className="p-2 border border-stone-300 rounded-lg bg-white text-stone-600 hover:bg-stone-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-stone-500 text-sm">
            Loading audit records...
          </div>
        ) : logs.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <FileSpreadsheet className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-800">No audit records found</h3>
            <p className="text-xs text-stone-500 mt-1">
              Events such as logins, 2FA verifications, and data modifications will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-200 text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 font-semibold">
                  <tr>
                    <th scope="col" className="px-4 py-3">Timestamp</th>
                    <th scope="col" className="px-4 py-3">Event</th>
                    <th scope="col" className="px-4 py-3">Result</th>
                    <th scope="col" className="px-4 py-3">Actor / Email</th>
                    <th scope="col" className="px-4 py-3">IP / Client</th>
                    <th scope="col" className="px-4 py-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-stone-500 font-sans">
                        {new Date(log.timestamp).toLocaleString("en-IN", {
                          dateStyle: "short",
                          timeStyle: "medium",
                        })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-semibold text-stone-800">
                        {log.event}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {log.result === "success" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" />
                            Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded">
                            <XCircle className="w-3 h-3" />
                            Failure
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-stone-700 font-sans">
                        {log.adminEmail || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-stone-500 text-[11px]">
                        {log.ip || "—"}
                      </td>
                      <td className="px-4 py-3 text-stone-600 text-[11px] max-w-xs truncate">
                        {log.details ? JSON.stringify(log.details) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-stone-200 bg-stone-50">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1.5 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-xs text-stone-500">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
