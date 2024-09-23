"use client";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [blague, setBlague] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour récupérer une blague
  const fetchBlague = useCallback(async () => {
    console.log("Début de fetchBlague");
    setLoading(true);
    setError(null);
    try {
      const timestamp = new Date().getTime();
      const res = await fetch(`/api/blagues?timestamp=${timestamp}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Blague reçue:", data);
      setBlague(data);
      setShowAnswer(false); // Réinitialiser l'état du bouton quand on charge une nouvelle blague
    } catch (error) {
      console.error("Erreur lors du chargement de la blague:", error);
      setError("Impossible de charger une blague. Veuillez réessayer.");
    } finally {
      setLoading(false);
      console.log("Fin de fetchBlague");
    }
  }, []);

  // Récupérer une blague au premier rendu
  useEffect(() => {
    console.log("useEffect initial");
    fetchBlague();
  }, [fetchBlague]);

  const handleNewJoke = () => {
    console.log("Clic sur 'Une autre !'");
    fetchBlague();
  };

  return (
    <div className="bg-cyan-300 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="card bg-cyan-50 rounded-lg w-full max-w-md text-center">
        <h1 className="text-5xl text-center my-4">😂</h1>
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : blague ? (
          <div className="pl-4 pr-4">
            <p className="mb-4">
              <strong>{blague.joke}</strong>
            </p>
            {/* N'affichez la réponse que si showAnswer est true */}
            {showAnswer && (
              <p className="text-sky-500 text-2xl">{blague.answer}</p>
            )}
          </div>
        ) : (
          <p>Aucune blague disponible</p>
        )}
        <div className="btn flex flex-row">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="cursor-pointer my-6 px-4 py-2 rounded-lg flex mx-auto bg-blue-700 text-white font-bold"
          >
            Réponse 💡
          </button>
          <button
            onClick={handleNewJoke}
            className="my-6 px-4 py-2 rounded-lg flex mx-auto bg-pink-400 text-white font-bold"
            disabled={loading}
          >
            {loading ? "Chargement..." : "Une autre !"}
          </button>
        </div>
      </div>
    </div>
  );
}
