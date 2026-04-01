export async function compressImage(
  file: File,
  maxDimension: number = 1200,
  maxSize: number = 2 * 1024 * 1024
): Promise<File> {
  // Se já está dentro do limite, retorna direto
  if (file.size <= maxSize) {
    const img = await loadImage(file);
    if (img.width <= maxDimension && img.height <= maxDimension) {
      return file;
    }
  }

  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // Calcula dimensões mantendo aspect ratio
  let { width, height } = img;
  if (width > maxDimension || height > maxDimension) {
    if (width > height) {
      height = Math.round((height * maxDimension) / width);
      width = maxDimension;
    } else {
      width = Math.round((width * maxDimension) / height);
      height = maxDimension;
    }
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  // Comprime com qualidade decrescente até ficar dentro do limite
  let quality = 0.9;
  let blob = await canvasToBlob(canvas, "image/jpeg", quality);

  while (blob.size > maxSize && quality > 0.3) {
    quality -= 0.1;
    blob = await canvasToBlob(canvas, "image/jpeg", quality);
  }

  return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
    type: "image/jpeg",
  });
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas toBlob failed"))),
      type,
      quality
    );
  });
}
