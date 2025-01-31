import type { NextRequest } from "next/server";

const { BITTE_API_KEY } = process.env;

if (!BITTE_API_KEY) {
  throw new Error("BITTE_API_KEY is required");
}

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export const POST = async (req: NextRequest): Promise<Response> => {
  const requestInit: RequestInit & { duplex: "half" } = {
    method: "POST",
    body: req.body,
    headers: {
      Authorization: `Bearer ${BITTE_API_KEY}`,
    },
    duplex: "half",
  };

  const upstreamResponse = await fetch(
    "https://api.bitte.ai/api/v1/chat",
    requestInit
  );
  const headers = new Headers(upstreamResponse.headers);
  headers.delete("Content-Encoding");

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers,
  });
};
