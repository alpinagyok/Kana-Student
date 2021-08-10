/* eslint-disable no-param-reassign */
let drawing = false;
let brushX = 0; let brushY = 0;
const smoothnessRadius = 0;

const blackColor = '#000000';
export const whiteColor = '#FFFFFF';

export const beginDrawing = (
  context: CanvasRenderingContext2D | null,
  event: React.MouseEvent | React.TouchEvent,
  left: number, top: number,
): void => {
  if (context) {
    drawing = true;

    context.strokeStyle = blackColor;
    context.lineWidth = 6;

    // handle both mobile and pc
    if (event.type === 'mousedown') {
      brushX = (event as React.MouseEvent).clientX - left;
      brushY = (event as React.MouseEvent).clientY - top;
    } else {
      brushX = (event as React.TouchEvent).touches[0].clientX - left;
      brushY = (event as React.TouchEvent).touches[0].clientY - top;
    }
    context.moveTo(brushX, brushY);
    context.beginPath();
  }
};

export const endDrawing = (
  context: CanvasRenderingContext2D | null,
): void => {
  if (context) {
    drawing = false;
  }
};

export const draw = (
  context: CanvasRenderingContext2D | null,
  event: React.MouseEvent | React.TouchEvent,
  left: number, top: number,
): void => {
  if (context && drawing) {
    let eventPosX: number; let eventPosY: number;

    if (event.type === 'mousemove') {
      eventPosX = (event as React.MouseEvent).clientX - left;
      eventPosY = (event as React.MouseEvent).clientY - top;
    } else {
      eventPosX = (event as React.TouchEvent).touches[0].clientX - left;
      eventPosY = (event as React.TouchEvent).touches[0].clientY - top;
    }

    // moves the line only when the mouse is some distance away,
    // provides smoothness effect
    const dist = Math.sqrt(
      (eventPosX - brushX) ** 2 + (eventPosY - brushY) ** 2,
    );
    if (dist > smoothnessRadius) {
      const distToMove = dist - smoothnessRadius;
      const sin = (eventPosY - brushY) / dist;
      const cos = (eventPosX - brushX) / dist;

      brushX += distToMove * cos;
      brushY += distToMove * sin;
    }

    context.lineTo(brushX, brushY);
    context.stroke();
  }
};

export const clearCanvas = (
  canvas: HTMLCanvasElement | null,
  context: CanvasRenderingContext2D | null,
): void => {
  if (context && canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = whiteColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
};

export const aa = 'a';
