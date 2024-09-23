import BlaguesAPI from "blagues-api";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

// Charger les variables d'environnement
dotenv.config();

export async function GET(request) {
  const blagues = new BlaguesAPI(process.env.BLAGUES_API_TOKEN);
  const { searchParams } = new URL(request.url);
  const timestamp = searchParams.get("timestamp");

  console.log(`Nouvelle requête de blague avec timestamp: ${timestamp}`);

  try {
    const blague = await blagues.random({
      disallow: [blagues.categories.DARK, blagues.categories.LIMIT],
    });
    console.log(`Blague récupérée: ${JSON.stringify(blague)}`);
    return NextResponse.json(blague);
  } catch (error) {
    console.error("Erreur lors de la récupération de la blague:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la blague." },
      { status: 500 }
    );
  }
}
