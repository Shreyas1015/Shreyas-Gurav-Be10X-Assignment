import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "",
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY ?? "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "",
});

export async function GET(req: Request) {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    console.log("Authentication Parameters:", authenticationParameters);
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("Error generating authentication parameters :", error);
    return NextResponse.json(
      { error: "Error generating authentication parameters" },
      { status: 500 }
    );
  }
}
