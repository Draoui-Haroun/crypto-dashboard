
import Footer from "@/app/components/Footer";
import { test, expect} from "vitest";
import { render, screen} from "@testing-library/react"

test("renders copyright", () => {
    render(<Footer />)
    expect(screen.getByText("© 2026 CryptoDash. All rights reserved.")).toBeInTheDocument();
})

test("renders technology information", () => {
    render(<Footer />)
    expect(screen.getByText("Built with Next.js & TypeScript")).toBeInTheDocument();
})