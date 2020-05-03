export function getHost(): string {
    return window.location.pathname.split("/")[1].trim();
}
