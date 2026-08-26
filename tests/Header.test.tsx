import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/app/components/Header";
import { ThemeProvider } from "@/context/themeContext";
import useEvent, { userEvent } from "@testing-library/user-event"
import Head from "next/head";
import { useState } from "react";

test("renders header", () => {
  const setSearch = vi.fn();

  render(
    <ThemeProvider>
      <Header search="" setSearch={setSearch} />
    </ThemeProvider>
  );

  expect(screen.getByRole("heading", { name: "CryptoDash" })).toBeInTheDocument();
  expect(screen.getByRole("textbox", {name: "Search cryptocurrencies"})).toBeInTheDocument();
});

test("updates search", async () => {
  const user = userEvent.setup();
  function TestComponent() {
    const [ search, setSearch] = useState("");
    return(
      <ThemeProvider>
        <Header search={search} setSearch={setSearch} />
        <div>{search}</div>
      </ThemeProvider>
    )
  }

  render(<TestComponent />)

  const input = screen.getByRole("textbox", {name: "Search cryptocurrencies"})
  await user.type(input, "bitcoin")
  expect(screen.getByText("bitcoin")).toBeInTheDocument();
})

test("toggles theme", async () => {
  const user = useEvent.setup();
  const setSearch = vi.fn();

  render(
    <ThemeProvider>
      <Header search="" setSearch={setSearch} />
    </ThemeProvider>
  )
  const button = screen.getByRole("button", { name: "☀️" });
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  await user.click(button);
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
})