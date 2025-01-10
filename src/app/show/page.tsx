"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

const DisplayImage = () => {
  const searchParams = useSearchParams();
  const nama1 = searchParams.get("nama1");
  const dob = searchParams.get("dob");
  const idPasien = searchParams.get("idPasien");
  const golonganDarah = searchParams.get("golonganDarah");
  const sex = searchParams.get("sex");
  const [imageUrl, setImageUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (nama1 && dob && idPasien && golonganDarah && sex) {
      generateImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nama1, dob, idPasien, golonganDarah, sex]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
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
      const namaText = (nama1 as string).toUpperCase();
      const namaWidth = ctx.measureText(namaText).width;
      if (namaWidth > canvas.width - 147 - 90) {
        toast.error("Nama terlalu panjang, silahkan singkat nama pasien");
      }
      ctx.fillText(namaText, 147, 325);

      // Informasi Detail dengan font yang lebih kecil
      ctx.font = "bold 24px 'Belleza', Arial";
      ctx.fillStyle = "#787878";

      // DOB dengan format yang diperbarui
      const formattedDate = formatDate(dob as string);
      ctx.fillText(formattedDate, 457, 450);

      // ID Pasien dengan padding nol
      ctx.fillText(idPasien as string, 457, 530);

      // Golongan Darah (diubah menjadi uppercase)
      ctx.fillText((golonganDarah as string).toUpperCase(), 713, 450);

      // Sex dengan format yang diperbarui
      const formattedSex =
        (sex as string).toUpperCase() === "MALE"
          ? "M"
          : (sex as string).toUpperCase() === "FEMALE"
          ? "F"
          : "";
      ctx.fillText(formattedSex, 713, 530);

      setImageUrl(canvas.toDataURL("image/png", 1.0));
    };
    img.src = "/background.png";
  };

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      {imageUrl && (
        <Image src={imageUrl} alt="Preview" width={1004} height={591} />
      )}
    </>
  );
};

export default DisplayImage;
