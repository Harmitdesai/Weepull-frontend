/**
 * Auto-resizes a textarea to fit content up to an optional max height.
 * If maxHeight is reached, vertical scrolling is enabled.
 */
export function resizeTextarea(el: HTMLTextAreaElement | null, maxHeightPx?: number) {
  if (!el) return;

  el.style.height = "auto"; // reset to measure
  el.style.height = `${el.scrollHeight}px`;

  if (typeof maxHeightPx === "number" && el.scrollHeight > maxHeightPx) {
    el.style.height = `${maxHeightPx}px`;
    el.style.overflowY = "auto";
  } else {
    el.style.overflowY = "hidden";
  }
}