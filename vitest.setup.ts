import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

const localStorageMock = {
    getItem: vi.fn().mockReturnValue(null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
})