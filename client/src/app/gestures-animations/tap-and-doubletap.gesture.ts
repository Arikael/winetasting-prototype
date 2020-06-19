export function createTapAndDoubleTapGestureOnStart(onTap: () => void, onDoubleTap: () => void, doubleTapThreshold: number): () => void {
    return (() => {
        let timeout = null;
        let lastOnStart = 0;

        return () => {
            const now = Date.now();

            if (Math.abs(now - lastOnStart) <= doubleTapThreshold) {
                clearTimeout(timeout);
                lastOnStart = 0;
                onDoubleTap();
            } else {
                lastOnStart = now;
                timeout = setTimeout(() => onTap(), doubleTapThreshold);
            }
        };
    })();
}
