
import {test, expect, vi} from "vitest"
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchFilter from "@/app/components/SearchFilter";

test("filter gainers", async () => {
    const setFilter = vi.fn();
    const setSort = vi.fn();
    render(
        <SearchFilter
        filter="all"
        setFilter={setFilter}
        sort="default"
        setSort={setSort}
        />
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole("button", {name: "Gainers"}));
    expect(setFilter).toHaveBeenCalledWith("gainers")
})

test("filter losers", async () => {
    const setFilter = vi.fn();
    const setSort = vi.fn();
    render(
        <SearchFilter
        filter="all"
        setFilter={setFilter}
        sort="default"
        setSort={setSort}
        />
    )
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", {name: "Losers"}));
    expect(setFilter).toHaveBeenCalledWith("losers")
})

test("selects price high option", async () => {
  const setFilter = vi.fn();
  const setSort = vi.fn();

  render(
    <SearchFilter
      filter="all"
      setFilter={setFilter}
      sort="default"
      setSort={setSort}
    />
  );

  const user = userEvent.setup();

  await user.selectOptions(
    screen.getByRole("combobox", {
      name: "Sort cryptocurrencies",
    }),
    "price-high"
  );

  expect(setSort).toHaveBeenCalledWith("price-high");
});

