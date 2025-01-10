"use client";
import { useState, useRef, useEffect } from "react";
import InputField from "@/app/_components/InputField";
import SelectField from "@/app/_components/SelectField";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";

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
      [name]: value.toUpperCase(),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const namaText = formData.nama1.toUpperCase();
      const namaWidth = ctx.measureText(namaText).width;
      if (namaWidth > canvas.width - 147 - 90) {
        toast.error("Nama terlalu panjang, silahkan singkat nama pasien");
      }
      ctx.fillText(namaText, 147, 325);

      // Informasi Detail dengan font yang lebih kecil
      ctx.font = "bold 24px 'Belleza', Arial";
      ctx.fillStyle = "#787878";

      // DOB dengan format yang diperbarui
      const formattedDate = formatDate(formData.dob);
      ctx.fillText(formattedDate, 457, 450);

      // ID Pasien dengan padding nol
      ctx.fillText(formData.idPasien, 457, 530);

      // Golongan Darah (diubah menjadi uppercase)
      ctx.fillText(formData.golonganDarah.toUpperCase(), 713, 450);

      // Sex dengan format yang diperbarui
      const formattedSex =
        formData.sex === "MALE" ? "M" : formData.sex === "FEMALE" ? "F" : "";
      ctx.fillText(formattedSex, 713, 530);

      setImageUrl(canvas.toDataURL("image/png", 1.0));
    };
    img.src = "/background.png";
  };

  const handleCopyDirectLink = () => {
    if (
      formData.nama1.trim() === "" ||
      formData.dob.trim() === "" ||
      formData.idPasien.trim() === "" ||
      formData.golonganDarah.trim() === "" ||
      formData.sex.trim() === ""
    ) {
      toast.error("Semua data pasien harus diisi");
      return;
    }
    const url = new URL("https://rskita.vercel.app/api/show");
    url.searchParams.append("nama1", formData.nama1);
    url.searchParams.append("dob", formData.dob);
    url.searchParams.append("idPasien", formData.idPasien);
    url.searchParams.append("golonganDarah", formData.golonganDarah);
    url.searchParams.append("sex", formData.sex);
    navigator.clipboard.writeText(url.toString());
    toast.success("Link berhasil disalin ke clipboard");
  };
  const handleCopyToClipboard = async () => {
    if (
      formData.nama1.trim() === "" ||
      formData.dob.trim() === "" ||
      formData.idPasien.trim() === "" ||
      formData.golonganDarah.trim() === "" ||
      formData.sex.trim() === ""
    ) {
      toast.error("Semua data pasien harus diisi");
      return;
    }
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      toast.success("Kartu pasien berhasil disalin ke clipboard");
    });
  };

  const handleCopyName = () => {
    navigator.clipboard.writeText(
      "``` NAMA PASIEN: " + formData.nama1 + " ```"
    );
    toast.success("Nama berhasil disalin ke clipboard");
  };

  const handleCopyDate = (date: string) => {
    navigator.clipboard.writeText(date);
    toast.success(`Tanggal ${date} berhasil disalin ke clipboard`);
  };

  const currentDate = formatDate(new Date().toISOString());
  const date7Days = formatDate(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  );
  const date30Days = formatDate(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  );

  return (
    <div className="min-h-screen py-12 px-4 dark:bg-[#19222C] dark:text-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg dark:bg-[#222E3C]">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 dark:text-gray-200">
              Kartu Pasien RS Kisah Tanah Air
            </h1>

            <div className="space-y-6">
              <InputField
                label="Nama Lengkap"
                name="nama1"
                value={formData.nama1}
                onChange={handleInputChange}
                placeholder="MASUKKAN NAMA LENGKAP"
              />
              <InputField
                tooltip="Input MM/DD/YYYY Otomatis Jadi DD/MM/YYYY"
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
                placeholder="MASUKKAN ID PASIEN"
              />
              <InputField
                label="Golongan Darah"
                name="golonganDarah"
                value={formData.golonganDarah}
                onChange={handleBloodTypeChange}
                placeholder="MASUKKAN GOLONGAN DARAH"
              />
              <SelectField
                label="Jenis Kelamin"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "PILIH JENIS KELAMIN" },
                  { value: "MALE", label: "LAKI-LAKI" },
                  { value: "FEMALE", label: "PEREMPUAN" },
                ]}
              />
              <div className="flex flex-col space-y-4">
                <button
                  onClick={handleCopyDirectLink}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Copy Url Image
                </button>
                <div className="flex space-x-4">
                  <button
                    onClick={handleCopyToClipboard}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Copy Image
                  </button>
                  <button
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                    data-tip="Copy Name"
                    onClick={handleCopyName}
                  >
                    Copy Name For Discord
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg dark:bg-[#222E3C]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-200">
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
            {/* Date Copy Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-gray-200">
                Tanggal
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Tanggal Sekarang: {currentDate}
                  </span>
                  <FaCopy
                    onClick={() => handleCopyDate(`${currentDate}`)}
                    className="text-blue-600 cursor-pointer hover:text-blue-700"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Tanggal 7 Hari Kedepan: {currentDate} - {date7Days}
                  </span>
                  <FaCopy
                    onClick={() =>
                      handleCopyDate(`${currentDate} - ${date7Days}`)
                    }
                    className="text-blue-600 cursor-pointer hover:text-blue-700"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Tanggal 30 Hari Kedepan: {currentDate} - {date30Days}
                  </span>
                  <FaCopy
                    onClick={() =>
                      handleCopyDate(`${currentDate} - ${date30Days}`)
                    }
                    className="text-blue-600 cursor-pointer hover:text-blue-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
