"use client";
import { useState } from "react";
import { Button } from "./ui/button";

export default function IframeToggle({ iframeUrl }) {
  const [show, setShow] = useState(false);

  return (
    <div className="pt-2">
      <Button
        variant="outline"
        className="w-full text-white bg-gradient-to-br from-blue-40 to-cyan-900/20 border-blue-500/30 border-blue-500 hover:text-white"
        onClick={() => setShow(!show)}
      >
        {show ? "Hide" : "See More"}
      </Button>

      {show && (
        <div className="mt-3 rounded overflow-hidden">
          <iframe
            title="Transport Model"
            width="100%"
            height="300"
            src={iframeUrl}
            frameBorder="0"
            allow="autoplay; fullscreen; vr"
            allowFullScreen
            className="w-full rounded-lg border border-blue-500/30"
          />
        </div>
      )}
    </div>
  );
}
