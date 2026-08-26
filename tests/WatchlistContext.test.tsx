import { test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import {
  WatchlistProvider,
  useWatchlist,
} from "@/context/WatchlistContext";
import userEvent from "@testing-library/user-event";

function TestComponent() {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  return (
    <>
      <button onClick={() => toggleWatchlist("bitcoin")}>
        Toggle Bitcoin
      </button>
      <div>
        {isInWatchlist("bitcoin") ? "yes" : "no"}
      </div>
    </>
  );
}

test("bitcoin is not in watchlist initially", () => {
  render(
    <WatchlistProvider>
      <TestComponent />
    </WatchlistProvider>
  );

  expect(screen.getByText("no")).toBeInTheDocument();
});

test("adds bitcoin to watchlist", async () => {
  const user = userEvent.setup();
  render(
    <WatchlistProvider>
      <TestComponent />
    </WatchlistProvider>
  );
  await user.click(
    screen.getByRole("button", { name: "Toggle Bitcoin" })
  );
  expect(screen.getByText("yes")).toBeInTheDocument();
});

test("removes bitcoin from watchlist", async () => {
  const user = userEvent.setup()
  render(
    <WatchlistProvider>
      <TestComponent/>
    </WatchlistProvider>
  )
  await user.click(screen.getByRole("button", {name: "Toggle Bitcoin"}))
  await user.click(screen.getByRole("button", {name: "Toggle Bitcoin"}))
  expect(screen.getByText("no")).toBeInTheDocument();
})

test("saves watchlist to localStorage", async () => {
  const user = userEvent.setup();

  const setItemSpy = vi.spyOn(localStorage, "setItem");

  render(
    <WatchlistProvider>
      <TestComponent />
    </WatchlistProvider>
  );

  await user.click(screen.getByRole("button", { name: "Toggle Bitcoin" }));

  expect(setItemSpy).toHaveBeenCalledWith(
    "watchlist",
    JSON.stringify(["bitcoin"])
  );
});

test("restores watchlist from localStorage", async () => {
  vi.spyOn(localStorage, "getItem").mockReturnValue(JSON.stringify(["bitcoin"]))

  render(
    <WatchlistProvider>
      <TestComponent />
    </WatchlistProvider>
  );

  await waitFor(() => {
    expect(screen.getByText("yes")).toBeInTheDocument();
  });
});

test("throw error when useWatchlist is used outside provides", () => {
  expect(() => {render(<TestComponent/>)}).toThrow("useWatchlist must be used inside WatchlistProvider")
})