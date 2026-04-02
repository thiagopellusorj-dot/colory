"use client";

import { useState } from "react";
import Image from "next/image";
import { t } from "@/lib/i18n";

interface BookPreviewProps {
  nomeFilho: string;
}

const books = [
  {
    title: "The Valley of Ancient Courage",
    cover: "/images/books/livro1-0.jpg",
    pages: [
      "/images/books/livro1-1.jpg",
      "/images/books/livro1-2.jpg",
      "/images/books/livro1-3.jpg",
      "/images/books/livro1-4.jpg",
    ],
  },
  {
    title: "Emma and Grandma's Dance of Love",
    cover: "/images/books/livro2-0.jpg",
    pages: [
      "/images/books/livro2-1.jpg",
      "/images/books/livro2-2.jpg",
      "/images/books/livro2-3.jpg",
      "/images/books/livro2-4.jpg",
    ],
  },
];

export function BookPreview({ nomeFilho }: BookPreviewProps) {
  const [activeBook, setActiveBook] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const txt = t().componentes;

  const book = books[activeBook];
  const allImages = [book.cover, ...book.pages];
  const isCover = activeSlide === 0;

  const goNext = () => {
    if (activeSlide < allImages.length - 1) {
      setActiveSlide((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (activeSlide > 0) {
      setActiveSlide((prev) => prev - 1);
    }
  };

  const switchBook = (index: number) => {
    setActiveBook(index);
    setActiveSlide(0);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-center text-lg font-bold text-gray-900">
        {txt.bookPreviewTitulo(nomeFilho)}
      </h3>

      {/* Book selector tabs */}
      <div className="flex gap-2 justify-center">
        {books.map((b, i) => (
          <button
            key={i}
            onClick={() => switchBook(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              i === activeBook
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {txt.bookPreviewExemplo(i + 1)}
          </button>
        ))}
      </div>

      {/* Image carousel */}
      <div className="relative mx-auto max-w-[340px]">
        <div className="overflow-hidden rounded-2xl shadow-xl bg-white">
          <div className={isCover ? "aspect-[3/4.2]" : "aspect-[10/7]"}>
            <Image
              src={allImages[activeSlide]}
              alt={`${book.title} - ${isCover ? txt.bookPreviewCapa : txt.bookPreviewPagina(activeSlide)}`}
              width={800}
              height={isCover ? 1121 : 560}
              className="w-full h-full object-cover"
              priority={activeSlide === 0}
            />
          </div>
        </div>

        {/* Slide label */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
          <p className="text-white text-xs font-medium">
            {isCover ? txt.bookPreviewCapa : txt.bookPreviewPagina(activeSlide)} / {allImages.length - 1}
          </p>
        </div>

        {/* Navigation arrows */}
        {activeSlide > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-purple-600 transition-colors text-lg"
          >
            &#8249;
          </button>
        )}
        {activeSlide < allImages.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-[-14px] top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-purple-600 transition-colors text-lg"
          >
            &#8250;
          </button>
        )}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5">
        {allImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === activeSlide
                ? "bg-purple-600 w-4"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Personalization callout */}
      <div className="bg-purple-50 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-700">
          {txt.bookPreviewDescricao(nomeFilho)}
        </p>
      </div>
    </div>
  );
}
