"use client";
import { useState } from "react";
import { site } from "@/config/site";
import Magnetic from "./Magnetic";

export default function CopyEmail() {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setState("copied");
      setTimeout(() => setState("idle"), 2400);
    } catch {
      setState("error");
    }
  };
  return (
    <>
      <Magnetic>
        <button type="button" className="btn" onClick={copy}>
          <span>{state === "copied" ? "Address copied ✓" : "Copy email address"}</span>
        </button>
      </Magnetic>
      <span role="status" className="copy-status">
        {state === "error" ? "Please select and copy the address above." : state === "copied" ? "Copied to clipboard." : ""}
      </span>
    </>
  );
}
