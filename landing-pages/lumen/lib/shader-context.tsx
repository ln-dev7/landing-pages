"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import {
  SHADER_VARIANTS,
  ShaderVariant,
  getVariantById,
} from "./shader-variants";

interface ShaderContextValue {
  variant: ShaderVariant;
  variantId: string;
  setVariantId: (id: string) => void;
}

const ShaderContext = createContext<ShaderContextValue | null>(null);

export function ShaderVariantProvider({ children }: { children: ReactNode }) {
  const [variantId, setVariantIdState] = useState<string>("warm");

  const setVariantId = useCallback((id: string) => {
    setVariantIdState(id);
  }, []);

  const variant = useMemo(() => getVariantById(variantId), [variantId]);

  const value = useMemo(
    () => ({
      variant,
      variantId,
      setVariantId,
    }),
    [variant, variantId, setVariantId]
  );

  return (
    <ShaderContext.Provider value={value}>{children}</ShaderContext.Provider>
  );
}

export function useShaderVariant() {
  const context = useContext(ShaderContext);
  if (!context) {
    return {
      variant: SHADER_VARIANTS[0],
      variantId: "warm",
      setVariantId: () => {},
    };
  }
  return context;
}
