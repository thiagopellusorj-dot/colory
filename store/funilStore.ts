"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FunilState {
  genero: "menino" | "menina" | null;
  nome_filho: string;
  idade: string;
  tempo_tela: string;
  conexao: string;
  objetivo: string;
  url_foto_original: string;
  url_foto_gerada: string;
  job_id: string;
  lead_id: string;
  whatsapp: string;
  email: string;
  otos_aceitos: string[];

  setGenero: (genero: "menino" | "menina") => void;
  setNomeFIlho: (nome: string) => void;
  setIdade: (idade: string) => void;
  setTempoTela: (tempo: string) => void;
  setConexao: (conexao: string) => void;
  setObjetivo: (objetivo: string) => void;
  setFotoOriginal: (url: string) => void;
  setFotoGerada: (url: string) => void;
  setJobId: (id: string) => void;
  setLead: (data: { lead_id: string; whatsapp: string; email: string }) => void;
  addOto: (oto: string) => void;
  reset: () => void;
}

const initialState = {
  genero: null as "menino" | "menina" | null,
  nome_filho: "",
  idade: "",
  tempo_tela: "",
  conexao: "",
  objetivo: "",
  url_foto_original: "",
  url_foto_gerada: "",
  job_id: "",
  lead_id: "",
  whatsapp: "",
  email: "",
  otos_aceitos: [] as string[],
};

export const useFunilStore = create<FunilState>()(
  persist(
    (set) => ({
      ...initialState,

      setGenero: (genero) => set({ genero }),
      setNomeFIlho: (nome_filho) => set({ nome_filho }),
      setIdade: (idade) => set({ idade }),
      setTempoTela: (tempo_tela) => set({ tempo_tela }),
      setConexao: (conexao) => set({ conexao }),
      setObjetivo: (objetivo) => set({ objetivo }),
      setFotoOriginal: (url_foto_original) => set({ url_foto_original }),
      setFotoGerada: (url_foto_gerada) => set({ url_foto_gerada }),
      setJobId: (job_id) => set({ job_id }),
      setLead: (data) => set(data),
      addOto: (oto) =>
        set((state) => ({ otos_aceitos: [...state.otos_aceitos, oto] })),
      reset: () => set(initialState),
    }),
    {
      name: "colory-funil",
    }
  )
);
