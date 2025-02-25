import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";

const fontPath = path.join(process.cwd(), "public", "fonts", "Belleza-Regular.ttf");
registerFont(fontPath, { family: "Belleza" });

const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const nama1 = searchParams.get("nama1") || searchParams.get("nama");
    const dob = searchParams.get("dob");
    const idPasien = searchParams.get("idPasien") || searchParams.get("patient_id");
    const golonganDarah = searchParams.get("golonganDarah") || searchParams.get("blood_type");
    const sex = searchParams.get("sex");

    if (!nama1 || !dob || !idPasien || !golonganDarah || !sex) {
        return new NextResponse("Missing required query parameters", { status: 400 });
    }

    const canvas = createCanvas(1004, 591);
    const ctx = canvas.getContext("2d");

    const imagePath = path.join(process.cwd(), "public", "background.png");
    const img = await loadImage(imagePath);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Nama Pasien
    ctx.font = "bold 42px 'Belleza'";
    const namaText = decodeURIComponent(nama1).toUpperCase();
    const namaWidth = ctx.measureText(namaText).width;
    if (namaWidth > canvas.width - 147 - 90) {
        return new NextResponse("Nama terlalu panjang, silahkan singkat nama pasien", { status: 400 });
    }
    ctx.fillText(namaText, 147, 325);

    // Informasi Detail dengan font yang lebih kecil
    ctx.font = "bold 24px 'Belleza'";
    ctx.fillStyle = "#787878";

    // DOB dengan format yang diperbarui
    const formattedDate = formatDate(decodeURIComponent(dob));
    ctx.fillText(formattedDate, 457, 450);

    // ID Pasien dengan padding nol
    ctx.fillText(decodeURIComponent(idPasien), 457, 530);

    // Golongan Darah (diubah menjadi uppercase)
    ctx.fillText(decodeURIComponent(golonganDarah).toUpperCase(), 713, 450);

    // Sex dengan format yang diperbarui
    const formattedSex = decodeURIComponent(sex).toUpperCase() === "MALE" ? "M" : decodeURIComponent(sex).toUpperCase() === "FEMALE" ? "F" : "";
    ctx.fillText(formattedSex, 713, 530);

    const buffer = canvas.toBuffer("image/png");
    return new NextResponse(buffer, {
        headers: {
            "Content-Type": "image/png",
        },
    });
}