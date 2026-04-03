import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = "/criar";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const response = NextResponse.redirect(new URL(next, request.url));

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Handle magic link (token_hash)
  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as "magiclink" | "email",
    });

    if (error) {
      console.error("[Auth Callback] verifyOtp failed:", error.message);
      return NextResponse.redirect(new URL("/login?error=link_invalido", request.url));
    }

    if (data?.session) {
      console.log("[Auth Callback] Magic link OK:", data.user?.email);
      return response;
    }

    console.error("[Auth Callback] verifyOtp succeeded but no session");
    return NextResponse.redirect(new URL("/login?error=sessao_falhou", request.url));
  }

  // Handle OAuth (code)
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[Auth Callback] exchangeCode failed:", error.message);
      return NextResponse.redirect(new URL("/login?error=oauth_falhou", request.url));
    }

    if (data?.session) {
      console.log("[Auth Callback] OAuth OK:", data.user?.email);
      return response;
    }

    console.error("[Auth Callback] exchangeCode succeeded but no session");
    return NextResponse.redirect(new URL("/login?error=sessao_falhou", request.url));
  }

  return NextResponse.redirect(new URL("/login?error=sem_credenciais", request.url));
}
