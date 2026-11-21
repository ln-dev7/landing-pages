"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, Sun, Moon } from "lucide-react";
import { SHADER_VARIANTS } from "@/lib/shader-variants";
import { useShaderVariant } from "@/lib/shader-context";

const easeTransition = [0.16, 1, 0.3, 1] as const;

export function FloatingControls() {
  const { variant, variantId, setVariantId } = useShaderVariant();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dialogId = useId();

  useEffect(() => {
    const el = document.documentElement;
    if (!el.classList.contains("dark") && !el.classList.contains("light")) {
      el.classList.add("dark");
    }
    setIsDark(el.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const el = document.documentElement;
    const nextDark = !el.classList.contains("dark");
    if (nextDark) {
      el.classList.add("dark");
    } else {
      el.classList.remove("dark");
    }
    setIsDark(nextDark);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (
        !target ||
        menuRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      setMenuOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const selectVariant = useCallback(
    (id: string) => {
      setVariantId(id);
      setMenuOpen(false);
    },
    [setVariantId]
  );

  return (
    <>
      {/* Palette Switcher Button */}
      <div className="fixed bottom-[160px] right-6 z-50 select-none">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={`Shader variant: ${variant.label}. Click to change.`}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-muted text-foreground opacity-30 shadow-lg transition-opacity duration-300 hover:opacity-100 hover:shadow-xl"
        >
          <Palette className="h-4 w-4" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background"
            style={{ backgroundColor: variant.swatch }}
          />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              role="dialog"
              aria-labelledby={dialogId}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: easeTransition }}
              className="absolute bottom-12 right-0 min-w-[240px] rounded-xl border border-foreground/[0.08] bg-background p-2 shadow-2xl"
              style={{ originX: 1, originY: 1 }}
            >
              <ul className="flex flex-col gap-0.5 list-none p-0 m-0">
                {SHADER_VARIANTS.map((item) => {
                  const isActive = item.id === variantId;
                  return (
                    <li key={item.id} className="list-none">
                      <button
                        type="button"
                        onClick={() => selectVariant(item.id)}
                        className={`group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors cursor-pointer ${
                          isActive
                            ? "bg-foreground/[0.06]"
                            : "hover:bg-foreground/[0.04]"
                        }`}
                        aria-pressed={isActive}
                      >
                        <span
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 rounded-md ring-1 ring-foreground/[0.08]"
                          style={{ backgroundColor: item.swatch }}
                        />
                        <span className="flex flex-1 flex-col leading-tight">
                          <span className="text-sm font-medium text-foreground">
                            {item.label}
                          </span>
                          <span className="text-xs text-foreground/55">
                            {item.description}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Toggle Button */}
      <div className="fixed bottom-[104px] right-6 z-50 select-none">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={isDark}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-muted text-foreground opacity-30 shadow-lg transition-opacity duration-300 hover:opacity-100 hover:shadow-xl"
        >
          {isDark ? (
            <Sun className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Moon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  );
}
