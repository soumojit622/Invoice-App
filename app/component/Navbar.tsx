import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ModeToggle } from "./Toggle";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-10" />
        <h3 className="text-3xl font-semibold">
          Chro<span className="text-blue-500">Matic.</span>
        </h3>
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Link href="/login">
          <RainbowButton>Get Started</RainbowButton>
        </Link>
      </div>
    </div>
  );
}
