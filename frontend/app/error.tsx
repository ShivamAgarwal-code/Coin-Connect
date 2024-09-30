"use client";
import React from "react";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="text-center m-8">
      <p>This is a error page</p>
      Error - {error.message}
    </div>
  );
}
