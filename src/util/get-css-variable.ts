export function getCssVariable(name: string): string {
    return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
}
