export function isCollide(a: HTMLDivElement, b: HTMLDivElement): boolean {
  if (!a || !b) return false;

  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

export function isTopCollide(a: HTMLDivElement, b: HTMLDivElement): boolean {
  if (!a || !b) return false;

  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return (
    (aRect.top - bRect.bottom, Math.abs(aRect.top - bRect.bottom) < 15) &&
    aRect.left < bRect.right &&
    aRect.right > bRect.left
  );
}
