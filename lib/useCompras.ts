"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

interface Compras {
  comprouLivro: boolean;
  comprouClube: boolean;
  loading: boolean;
}

export function useCompras(): Compras {
  const [comprouLivro, setComprouLivro] = useState(false);
  const [comprouClube, setComprouClube] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.email) { setLoading(false); return; }

        const { data: userData } = await supabase
          .from("usuarios")
          .select("id")
          .eq("email", user.email)
          .single();

        if (!userData) { setLoading(false); return; }

        const { data: compras } = await supabase
          .from("compras")
          .select("produto")
          .eq("usuario_id", userData.id);

        if (compras) {
          const produtos = compras.map((c) => c.produto);
          setComprouLivro(produtos.includes("livro"));
          setComprouClube(produtos.includes("clube"));
        }
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { comprouLivro, comprouClube, loading };
}
