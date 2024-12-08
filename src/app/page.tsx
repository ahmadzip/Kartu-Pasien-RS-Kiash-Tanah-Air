"use client";
import { useState, useRef, useEffect } from "react";
import InputField from "@/app/_components/InputField";
import SelectField from "@/app/_components/SelectField";

export default function Home() {
  const [formData, setFormData] = useState({
    nama1: "",
    dob: "",
    idPasien: "",
    golonganDarah: "",
    sex: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBloodTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  useEffect(() => {
    generatePreview();
  }, [formData]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const generatePreview = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = 1004;
      canvas.height = 591;

      // Draw background
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Konfigurasi style untuk nama
      ctx.fillStyle = "#333333";
      ctx.textAlign = "left";

      // Nama Pasien
      ctx.font = "bold 42px 'Belleza', Arial";
      ctx.fillText(formData.nama1.toUpperCase(), 147, 325);

      // Informasi Detail dengan font yang lebih kecil
      ctx.font = "bold 24px 'Belleza', Arial";
      ctx.fillStyle = "#444444";

      // DOB dengan format yang diperbarui
      const formattedDate = formatDate(formData.dob);
      ctx.fillText(formattedDate, 457, 450);

      // ID Pasien dengan padding nol
      ctx.fillText(formData.idPasien, 457, 530);

      // Golongan Darah (diubah menjadi uppercase)
      ctx.fillText(formData.golonganDarah.toUpperCase(), 713, 450);

      // Sex dengan format yang diperbarui
      const formattedSex =
        formData.sex === "male" ? "M" : formData.sex === "female" ? "F" : "";
      ctx.fillText(formattedSex, 713, 530);

      setImageUrl(canvas.toDataURL("image/png", 1.0));
    };
    img.src = "/background.png";
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    const currentDate = new Date().toISOString().slice(0, 10);
    link.download = `kartu_pasien_${formData.nama1.replace(
      /\s+/g,
      "_"
    )}_${currentDate}.png`;
    link.href = imageUrl;
    link.click();
  };

  const handleCopyToClipboard = async () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      alert("Image copied to clipboard!");
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Kartu Pasien RS Kiash Tanah Air
            </h1>

            <div className="space-y-6">
              <InputField
                label="Nama Lengkap"
                name="nama1"
                value={formData.nama1}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
              />
              <InputField
                label="Tanggal Lahir"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                type="date"
              />
              <InputField
                label="ID Pasien"
                name="idPasien"
                value={formData.idPasien}
                onChange={handleInputChange}
                placeholder="Masukkan ID Pasien"
              />
              <InputField
                label="Golongan Darah"
                name="golonganDarah"
                value={formData.golonganDarah}
                onChange={handleBloodTypeChange}
                placeholder="Masukkan Golongan Darah"
              />
              <SelectField
                label="Jenis Kelamin"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Pilih Jenis Kelamin" },
                  { value: "male", label: "Laki-laki" },
                  { value: "female", label: "Perempuan" },
                ]}
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Download Kartu
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Preview Kartu
            </h2>
            <canvas ref={canvasRef} className="hidden" />
            {imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full rounded-lg shadow-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
