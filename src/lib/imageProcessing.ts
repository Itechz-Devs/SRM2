export type DemoResult = {
  inputUrl: string;
  outputUrl: string;
  uncertaintyUrl: string;
  fileName: string;
  inputSize: string;
  outputSize: string;
};

function clamp(value: number) {
  return Math.max(0, Math.min(255, value));
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export function createSyntheticScene() {
  const canvas = document.createElement("canvas");
  canvas.width = 360;
  canvas.height = 240;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return "";
  }

  const fields = ["#6f8f45", "#7ca35a", "#8aa75c", "#536f3b", "#b2a56e", "#496f5a"];

  ctx.fillStyle = "#638156";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      ctx.fillStyle = fields[(row * 3 + col) % fields.length];
      ctx.fillRect(col * 58 - 16, row * 54 - 12, 60, 58);
      ctx.strokeStyle = "rgba(245, 238, 196, 0.23)";
      ctx.lineWidth = 2;
      ctx.strokeRect(col * 58 - 16, row * 54 - 12, 60, 58);
    }
  }

  ctx.strokeStyle = "rgba(232, 220, 175, 0.82)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-20, 188);
  ctx.bezierCurveTo(70, 158, 135, 166, 202, 118);
  ctx.bezierCurveTo(252, 82, 300, 82, 392, 45);
  ctx.stroke();

  ctx.strokeStyle = "rgba(67, 104, 122, 0.76)";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(306, -10);
  ctx.bezierCurveTo(314, 58, 334, 96, 316, 160);
  ctx.bezierCurveTo(306, 198, 330, 224, 374, 252);
  ctx.stroke();

  ctx.fillStyle = "#7b7f84";
  for (let i = 0; i < 15; i += 1) {
    const x = 42 + ((i * 31) % 154);
    const y = 28 + ((i * 19) % 92);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(((i % 5) - 2) * 0.12);
    ctx.fillRect(-5, -4, 12 + (i % 3) * 3, 9 + (i % 2) * 3);
    ctx.restore();
  }

  ctx.globalAlpha = 0.14;
  ctx.fillStyle = "#f4f0d8";
  for (let i = 0; i < 150; i += 1) {
    ctx.fillRect((i * 47) % 360, (i * 29) % 240, 1, 1);
  }
  ctx.globalAlpha = 1;

  return canvas.toDataURL("image/jpeg", 0.92);
}

export async function enhanceImage(
  src: string,
  fileName = "synthetic-sentinel-tile.jpg",
): Promise<DemoResult> {
  const image = await loadImage(src);
  const baseCanvas = document.createElement("canvas");
  const maxBaseWidth = 300;
  const ratio = Math.min(1, maxBaseWidth / image.width);
  const baseWidth = Math.max(160, Math.round(image.width * ratio));
  const baseHeight = Math.max(110, Math.round(image.height * ratio));

  baseCanvas.width = baseWidth;
  baseCanvas.height = baseHeight;
  const baseCtx = baseCanvas.getContext("2d");
  if (!baseCtx) {
    throw new Error("Canvas is not available in this browser.");
  }

  baseCtx.imageSmoothingEnabled = true;
  baseCtx.imageSmoothingQuality = "high";
  baseCtx.drawImage(image, 0, 0, baseWidth, baseHeight);

  const scale = 3;
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = baseWidth * scale;
  outputCanvas.height = baseHeight * scale;
  const outputCtx = outputCanvas.getContext("2d");
  if (!outputCtx) {
    throw new Error("Canvas is not available in this browser.");
  }

  outputCtx.imageSmoothingEnabled = true;
  outputCtx.imageSmoothingQuality = "high";
  outputCtx.drawImage(baseCanvas, 0, 0, outputCanvas.width, outputCanvas.height);

  const imageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
  const source = new Uint8ClampedArray(imageData.data);
  const width = outputCanvas.width;
  const height = outputCanvas.height;

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = (y * width + x) * 4;
      for (let channel = 0; channel < 3; channel += 1) {
        const center = source[index + channel] * 5;
        const left = source[index - 4 + channel];
        const right = source[index + 4 + channel];
        const top = source[index - width * 4 + channel];
        const bottom = source[index + width * 4 + channel];
        imageData.data[index + channel] = clamp(center - left - right - top - bottom);
      }
    }
  }
  outputCtx.putImageData(imageData, 0, 0);

  const uncertaintyCanvas = document.createElement("canvas");
  uncertaintyCanvas.width = outputCanvas.width;
  uncertaintyCanvas.height = outputCanvas.height;
  const uncertaintyCtx = uncertaintyCanvas.getContext("2d");
  if (!uncertaintyCtx) {
    throw new Error("Canvas is not available in this browser.");
  }

  const enhanced = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
  const uncertainty = uncertaintyCtx.createImageData(outputCanvas.width, outputCanvas.height);

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = (y * width + x) * 4;
      const leftIndex = index - 4;
      const rightIndex = index + 4;
      const topIndex = index - width * 4;
      const bottomIndex = index + width * 4;
      const gray =
        enhanced.data[index] * 0.299 + enhanced.data[index + 1] * 0.587 + enhanced.data[index + 2] * 0.114;
      const grayLeft =
        enhanced.data[leftIndex] * 0.299 +
        enhanced.data[leftIndex + 1] * 0.587 +
        enhanced.data[leftIndex + 2] * 0.114;
      const grayRight =
        enhanced.data[rightIndex] * 0.299 +
        enhanced.data[rightIndex + 1] * 0.587 +
        enhanced.data[rightIndex + 2] * 0.114;
      const grayTop =
        enhanced.data[topIndex] * 0.299 + enhanced.data[topIndex + 1] * 0.587 + enhanced.data[topIndex + 2] * 0.114;
      const grayBottom =
        enhanced.data[bottomIndex] * 0.299 +
        enhanced.data[bottomIndex + 1] * 0.587 +
        enhanced.data[bottomIndex + 2] * 0.114;

      const edgeStrength = Math.min(255, Math.abs(gray * 4 - grayLeft - grayRight - grayTop - grayBottom) * 2.5);
      uncertainty.data[index] = clamp(20 + edgeStrength * 1.1);
      uncertainty.data[index + 1] = clamp(60 + edgeStrength * 0.5);
      uncertainty.data[index + 2] = clamp(110 - edgeStrength * 0.25);
      uncertainty.data[index + 3] = 255;
    }
  }
  uncertaintyCtx.putImageData(uncertainty, 0, 0);

  return {
    inputUrl: baseCanvas.toDataURL("image/jpeg", 0.9),
    outputUrl: outputCanvas.toDataURL("image/jpeg", 0.92),
    uncertaintyUrl: uncertaintyCanvas.toDataURL("image/png"),
    fileName,
    inputSize: `${baseWidth} x ${baseHeight} px sample tile`,
    outputSize: `${outputCanvas.width} x ${outputCanvas.height} px simulated <4 m product`,
  };
}