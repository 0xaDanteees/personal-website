type Props = {
    text: string;
    className?: string;
    delayMs?: number;
}

export function Animated(props: Props) {
    return (
        <span
            aria-label={props.text}
            className={props.className}
        >
            {props.text.split('').map((char, idx) => (
                <span
                    key={idx}
                    className="inline-block will-change-transform motion--reduce:animate-none animate-[fall_0.7s_cubic_bezier(.2,.8,.2,1)_both]"
                    style={{ animationDelay: props.delayMs ? `${idx * props.delayMs}ms` : undefined }}
                >
                    {char === ' ' ? '\u00a0' : char}
                </span>
            ))}
        </span>
    )
}