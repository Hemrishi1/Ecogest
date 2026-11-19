const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject?: string;
  message: string;
}

export interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  quantity?: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to submit contact message. Please try again.",
        errors: result.errors,
      };
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        "Unable to connect to the server. Please check your internet connection or email us directly at kanhaiya.mali@ecogestindia.com.",
    };
  }
}

export async function submitQuoteForm(data: QuoteFormData): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to submit quote request. Please try again.",
        errors: result.errors,
      };
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        "Unable to connect to the server. Please check your internet connection or call +91 9321233436.",
    };
  }
}
