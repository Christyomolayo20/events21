import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-36 pb-24 flex items-center justify-center px-4 bg-brand-warm-white">
      <div className="max-w-lg w-full text-center bg-white p-8 sm:p-12 rounded-3xl border border-brand-warm-border shadow-elevated">
        <div className="w-14 h-14 rounded-2xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center mx-auto mb-6">
          <Compass className="w-7 h-7" />
        </div>

        <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold font-sans">
          Page Not Found • 404
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum mt-2 mb-4">
          Moments Worth Finding
        </h1>

        <p className="text-sm text-brand-plum/70 font-sans leading-relaxed mb-8">
          The page or celebration you are looking for has been moved or does not exist. Explore our event portfolio or get in touch with our lead planning team.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-brand-warm-border hover:border-brand-purple text-brand-plum text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>View Gallery</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
