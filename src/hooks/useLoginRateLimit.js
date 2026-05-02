import { useState, useEffect, useCallback } from "react";

const MAX_ATTEMPTS = 5;
const BASE_LOCKOUT_MS = 30_000; // 30 s en el primer bloqueo

function getStoredState(key) {
  try {
    const raw = localStorage.getItem(`rateLimit_${key}`);
    return raw ? JSON.parse(raw) : { attempts: 0, lockedUntil: 0 };
  } catch {
    return { attempts: 0, lockedUntil: 0 };
  }
}

/**
 * Bloquea el formulario de login tras MAX_ATTEMPTS fallos consecutivos.
 * El bloqueo usa backoff exponencial: 30 s, 60 s, 120 s…
 *
 * @param {string} storageKey  Clave única por formulario (ej: "admin", "comprador")
 */
export function useLoginRateLimit(storageKey) {
  const [state, setState] = useState(() => getStoredState(storageKey));
  const [secondsLeft, setSecondsLeft] = useState(0);

  const persist = useCallback(
    (newState) => {
      localStorage.setItem(`rateLimit_${storageKey}`, JSON.stringify(newState));
      setState(newState);
    },
    [storageKey]
  );

  // Cuenta regresiva mientras el bloqueo esté activo
  useEffect(() => {
    if (state.lockedUntil <= Date.now()) {
      setSecondsLeft(0);
      return;
    }

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((state.lockedUntil - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) persist({ ...state, lockedUntil: 0 });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [state.lockedUntil, persist, state]);

  const isLocked = state.lockedUntil > Date.now();

  /** Llamar cuando el login falla (credenciales incorrectas). */
  const registerFailure = useCallback(() => {
    const current = getStoredState(storageKey);
    const newAttempts = current.attempts + 1;

    if (newAttempts >= MAX_ATTEMPTS) {
      // Cada bloqueo adicional dobla el tiempo: 30s → 60s → 120s…
      const factor = Math.pow(2, newAttempts - MAX_ATTEMPTS);
      const lockMs = BASE_LOCKOUT_MS * factor;
      persist({ attempts: newAttempts, lockedUntil: Date.now() + lockMs });
    } else {
      persist({ attempts: newAttempts, lockedUntil: 0 });
    }
  }, [storageKey, persist]);

  /** Llamar cuando el login es exitoso — resetea el contador. */
  const registerSuccess = useCallback(() => {
    localStorage.removeItem(`rateLimit_${storageKey}`);
    setState({ attempts: 0, lockedUntil: 0 });
    setSecondsLeft(0);
  }, [storageKey]);

  return {
    isLocked,
    secondsLeft,
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - state.attempts),
    registerFailure,
    registerSuccess,
  };
}
