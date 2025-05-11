import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get("employeeId");

  if (!employeeId) {
    return new Response("Employee ID is required", { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({
      headless:true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined in environment variables");
    }

    await page.goto(`${baseUrl}/report/${employeeId}`, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "10mm", right: "10mm" },
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${employeeId}_report.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response("Error generating report", { status: 500 });
  }
}
