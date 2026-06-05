"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { Check, MapPin, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const StockChecker = () => {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "instock" | "outstock"
  >("idle");

  const handleCheck = () => {
    if (pincode.length !== 6) return;

    setStatus("loading");

    // Simulate API delay
    setTimeout(() => {
      // Mock logic: Pincodes ending in '0' or '5' are out of stock
      if (pincode.endsWith("0") || pincode.endsWith("5")) {
        setStatus("outstock");
      } else {
        setStatus("instock");
      }
    }, 1000);
  };

  return (
    <div className="mt-8 border rounded-lg p-4 bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-gray-500" />
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Check Availability
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Pincode"
            maxLength={6}
            value={pincode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setPincode(val);
              setStatus("idle");
            }}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-slate-950 dark:border-gray-700"
          />
          <Button
            disabled={pincode.length !== 6 || status === "loading"}
            onClick={handleCheck}
            className="w-auto"
          >
            {status === "loading" ? "Checking..." : "Check"}
          </Button>
        </div>

        {status === "instock" && (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm mt-1 animate-in fade-in slide-in-from-top-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Available for delivery to {pincode}</span>
          </div>
        )}

        {status === "outstock" && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-1 animate-in fade-in slide-in-from-top-1">
            <XCircle className="w-4 h-4" />
            <span>Currently unavailable at {pincode}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockChecker;
