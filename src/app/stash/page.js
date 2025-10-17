"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import StashToolbar from "@/components/StashToolbar";
import StashMasonry from "@/components/StashMasonry";
import { queryStash } from "@/data/stashItems";

const LOCAL_STORAGE_KEY = "stash:ui:v1";

export default function StashPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [ui, setUi] = useState({
    categories: [],
    types: [],
    sort: "newest",
    q: "",
  });
  const [initialized, setInitialized] = useState(false);

  // Initialize from URL, then localStorage
  useEffect(() => {
    // Parse URL params first
    const sp = new URLSearchParams(searchParams?.toString() || "");
    const parseList = (key) => {
      const v = sp.get(key);
      return v
        ? v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
    };

    const urlState = {
      categories: parseList("category"),
      types: parseList("type"),
      sort: sp.get("sort") || "newest",
      q: sp.get("q") || "",
    };

    const hasUrlState =
      urlState.categories.length > 0 ||
      urlState.types.length > 0 ||
      (urlState.q && urlState.q.length > 0) ||
      urlState.sort !== "newest";

    if (hasUrlState) {
      setUi(urlState);
      setInitialized(true);
      return;
    }

    // Fallback to localStorage
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem(LOCAL_STORAGE_KEY)
          : null;
      if (raw) {
        const persisted = JSON.parse(raw);
        setUi({
          categories: [],
          types: [],
          sort: "newest",
          q: "",
          ...persisted,
        });
      }
    } catch {}
    setInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync to URL + persist to localStorage
  useEffect(() => {
    if (!initialized) return;
    const sp = new URLSearchParams();
    if (ui.categories.length > 0) sp.set("category", ui.categories.join(","));
    if (ui.types.length > 0) sp.set("type", ui.types.join(","));
    if (ui.q && ui.q.trim().length > 0) sp.set("q", ui.q);
    if (ui.sort && ui.sort !== "newest") sp.set("sort", ui.sort);

    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ui));
    } catch {}
  }, [ui, initialized, pathname, router]);

  const filteredItems = useMemo(() => queryStash(ui), [ui]);

  return (
    <div className="blog-layout">
      <div className="blog-container">
        {/* Full-width content area under sticky site header */}
        <div className="stash-content">
          <StashToolbar
            value={ui}
            onChange={setUi}
            itemsCount={filteredItems.length}
          />
          <StashMasonry items={filteredItems} />
        </div>
      </div>
    </div>
  );
}
