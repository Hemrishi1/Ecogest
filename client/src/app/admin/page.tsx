"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  LogOut,
  Mail,
  FileText,
  Trash2,
  RefreshCw,
  Clock,
  User,
  Building,
  Phone,
  FileSpreadsheet,
  AlertTriangle,
} from "lucide-react";
import { authApi } from "@/lib/auth-client";

interface Submission {
  id: string;
  type: "contact" | "quote";
  submittedAt: string;
  data: Record<string, any>;
  ip?: string;
  userAgent?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [admin, setAdmin] = useState<{
    id: string;
    email: string;
    twoFactorEnabled: boolean;
  } | null>(null);

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadAdminAndSubmissions();
  }, [filterType, page]);

  const loadAdminAndSubmissions = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const meRes = await authApi.getMe();
      setAdmin(meRes.admin);

      const subRes = await authApi.getSubmissions({
        page,
        limit: 15,
        type: filterType === "all" ? undefined : filterType,
      });

      setSubmissions(subRes.submissions);
      setTotalPages(subRes.pagination.totalPages);
      setTotalCount(subRes.pagination.total);
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        router.push("/admin/login");
      } else {
        setErrorMessage(err.message || "Failed to load dashboard data.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      router.push("/admin/login");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this submission?")) {
      return;
    }

    setIsDeleting(id);
    try {
      await authApi.deleteSubmission(id);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setTotalCount((prev) => Math.max(0, prev - 1));
    } catch (err: any) {
      alert(err.message || "Failed to delete submission.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      {/* Top Navigation */}
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
                className="px-3 py-1.5 rounded-lg bg-[#1D3D2F]/10 text-[#1D3D2F] font-semibold"
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
                className="px-3 py-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Audit Logs
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {admin && (
              <span className="text-xs text-stone-500 hidden sm:inline-block">
                Signed in as <strong className="text-stone-700">{admin.email}</strong>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-red-700 hover:text-red-900 px-3 py-1.5 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Persistent 2FA Warning Banner if 2FA Disabled */}
      {admin && !admin.twoFactorEnabled && (
        <div className="bg-amber-500 text-slate-950 border-b border-amber-600 px-4 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-950 shrink-0" />
              <span>
                <strong>Action Required:</strong> Two-Factor Authentication (2FA) is currently disabled on your account. Protect your administrative access now.
              </span>
            </div>
            <Link
              href="/admin/security"
              className="shrink-0 bg-stone-900 text-white hover:bg-black font-semibold text-xs px-3.5 py-1.5 rounded-md shadow-sm transition-colors"
            >
              Enroll in 2FA Now →
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-900">Form Submissions</h1>
            <p className="text-xs text-stone-500 mt-1">
              Direct inquiries and quote requests collected securely ({totalCount} total)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg border border-stone-300 bg-white p-0.5 text-xs">
              <button
                onClick={() => { setFilterType("all"); setPage(1); }}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  filterType === "all" ? "bg-[#1D3D2F] text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                All
              </button>
              <button
                onClick={() => { setFilterType("quote"); setPage(1); }}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  filterType === "quote" ? "bg-[#1D3D2F] text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Quotes
              </button>
              <button
                onClick={() => { setFilterType("contact"); setPage(1); }}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  filterType === "contact" ? "bg-[#1D3D2F] text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Contact
              </button>
            </div>

            <button
              onClick={() => loadAdminAndSubmissions()}
              disabled={isLoading}
              title="Refresh submissions"
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
            Loading submissions...
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <FileSpreadsheet className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-800">No submissions found</h3>
            <p className="text-xs text-stone-500 mt-1">
              New inquiries from the website forms will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm hover:border-stone-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded ${
                        item.type === "quote"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(item.submittedAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting === item.id}
                    className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 self-end sm:self-auto p-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-stone-800 font-semibold">
                      <User className="w-4 h-4 text-stone-400" />
                      {item.data.name || item.data.fullName || "—"}
                    </div>
                    {item.data.company && (
                      <div className="flex items-center gap-1.5 text-stone-600 text-xs">
                        <Building className="w-3.5 h-3.5 text-stone-400" />
                        {item.data.company}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-stone-700 text-xs">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <a href={`mailto:${item.data.email}`} className="hover:underline text-[#1D3D2F]">
                        {item.data.email || "—"}
                      </a>
                    </div>
                    {item.data.phone && (
                      <div className="flex items-center gap-1.5 text-stone-700 text-xs">
                        <Phone className="w-3.5 h-3.5 text-stone-400" />
                        <a href={`tel:${item.data.phone}`} className="hover:underline">
                          {item.data.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 text-xs text-stone-600">
                    {item.data.productInterest && (
                      <div>
                        <strong className="text-stone-800">Product:</strong> {item.data.productInterest}
                      </div>
                    )}
                    {item.data.quantity && (
                      <div>
                        <strong className="text-stone-800">Quantity:</strong> {item.data.quantity}
                      </div>
                    )}
                  </div>
                </div>

                {item.data.message && (
                  <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-700 bg-stone-50 p-3 rounded-lg">
                    <strong className="text-stone-900 block mb-1">Message / Requirements:</strong>
                    <p className="whitespace-pre-line leading-relaxed">{item.data.message}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
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
