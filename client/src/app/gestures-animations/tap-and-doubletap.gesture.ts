export function createTapAndDoubleTapGestureOnStart(onTap: () => void, onDoubleTap: () => void, doubleTapThreshold: number): () => void {
    return (() => {
        let timeout = null;
        let lastOnStart = 0;

        return () => {
            const now = Date.now();
            console.log('test');

            if (Math.abs(now - lastOnStart) <= doubleTapThreshold) {
                clearTimeout(timeout);
                console.log('double');
                lastOnStart = 0;
                onDoubleTap();
            } else {
                lastOnStart = now;
                timeout = setTimeout(() => onTap(), doubleTapThreshold);
            }
        };
    })();
}
