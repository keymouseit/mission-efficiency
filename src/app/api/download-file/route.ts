import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_DOWNLOAD_ROOT = path.join(process.cwd(), "public");

// Sanitize for security (prevents ../ traversal)
const sanitizeLocalPath = (relativePath: string) => {
  const normalized = path
    .normalize(relativePath)
    .replace(/^(\.\.(\/|\\|$))+/g, "");
  return normalized;
};

// Extract filename from URL or file param
const getFileName = (input: string) => {
  try {
    const decoded = decodeURIComponent(input);
    const withoutQuery = decoded.split("?")[0];
    const baseName = path.basename(withoutQuery);
    return baseName || "download";
  } catch {
    return "download";
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileParam = searchParams.get("file");
  const urlParam = searchParams.get("url");

  if (!fileParam && !urlParam) {
    return NextResponse.json(
      { error: "Either file or url query parameter is required." },
      { status: 400 }
    );
  }

  try {
    if (urlParam) {
      const decodedUrl = decodeURIComponent(urlParam);

      if (!/^https?:\/\//i.test(decodedUrl)) {
        return NextResponse.json(
          { error: "Only HTTP(S) URLs are allowed." },
          { status: 400 }
        );
      }

      const externalResponse = await fetch(decodedUrl, { cache: "no-store" });

      if (!externalResponse.ok) {
        return NextResponse.json(
          {
            error: `Remote file request failed with status ${externalResponse.status}.`,
          },
          { status: externalResponse.status }
        );
      }

      const arrayBuffer = await externalResponse.arrayBuffer();
      const filename = getFileName(decodedUrl);
      const contentType =
        externalResponse.headers.get("content-type") ||
        "application/octet-stream";

      return new NextResponse(new Uint8Array(arrayBuffer), {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    if (fileParam) {
      const sanitizedPath = sanitizeLocalPath(decodeURIComponent(fileParam));
      const absolutePath = path.join(PUBLIC_DOWNLOAD_ROOT, sanitizedPath);

      // Security check: must stay inside /public
      if (!absolutePath.startsWith(PUBLIC_DOWNLOAD_ROOT)) {
        return NextResponse.json(
          { error: "Invalid file path." },
          { status: 400 }
        );
      }

      const fileBuffer = await fs.readFile(absolutePath);
      const filename = getFileName(sanitizedPath);

      return new NextResponse(new Uint8Array(fileBuffer), {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    return NextResponse.json(
      { error: "Unable to process request." },
      { status: 400 }
    );
  } catch (error) {
    console.error("download-file route error", error);
    return NextResponse.json(
      { error: "Failed to download requested file." },
      { status: 500 }
    );
  }
}
