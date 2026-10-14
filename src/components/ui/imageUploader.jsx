"use client";
import { useState } from "react";
import { subirImagenAPI } from "@/services/client/upload.service";

export default function ImageUploader({ onUploaded }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    try {
      const data = await subirImagenAPI(file);
      onUploaded?.(data); // devuelve { url, public_id } al formulario
    } catch (err) {
      setError(err.message);
      setPreview(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
        disabled={loading}
      />
      {loading && <p>Subiendo...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          style={{ maxWidth: 160, marginTop: 8 }}
        />
      )}
    </div>
  );
}
