"use client";

import { useSelectedLayoutSegments } from "next/navigation";

export default function Page() {
  const segments = useSelectedLayoutSegments();

  console.log(segments);

  return (
    <ul>
      {segments.map((segment, index) => (
        <li key={index}>{segment}</li>
      ))}
    </ul>
  );
}
