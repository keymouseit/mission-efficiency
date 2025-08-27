"use client";

import { motion } from "framer-motion";
import React from "react";

interface BorderAnimation {
    duration?: number;
    ease?: string;
    color?: string;
    width?: string | number;
}
interface FadeInWrapperProps {
    children?: React.ReactNode;
    x?: number;
    y?: number;
    duration?: number;
    once?: boolean;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    dangerouslySetInnerHTML?: { __html: string };
    motionKey?: string | number;
    type?: "spring" | "tween" | "ease";
    scale?: number;
    delay?: number;
    onClick?: () => void;
    initial?: any;
    animate?: any;
    scrollAnimation?: boolean;
    border?: BorderAnimation;
}

const FadeInWrapper: React.FC<FadeInWrapperProps> = ({
    children,
    x,
    y,
    duration = 0.5,
    once = false,
    className,
    id,
    style,
    dangerouslySetInnerHTML,
    motionKey,
    type = "spring",
    scale,
    delay,
    onClick,
    initial,
    animate,
    scrollAnimation = true,
    border,
}) => {
    const defaultInitial = {
        opacity: 0,
        ...(x ? { x } : {}),
        ...(y ? { y } : {}),
        ...(scale ? { scale: 0 } : {}),
    };

    const defaultAnimate = {
        opacity: 1,
        ...(x ? { x: 0 } : {}),
        ...(y ? { y: 0 } : {}),
        ...(scale ? { scale } : {}),
    };

    const motionProps = {
        initial: initial || defaultInitial,
        animate: animate || (scrollAnimation ? undefined : defaultAnimate),
        whileInView: scrollAnimation ? (animate || defaultAnimate) : undefined,
        viewport: scrollAnimation ? { once } : undefined,
        transition: {
            duration,
            type,
            ...(delay ? { delay } : {}),
            ...(border?.duration ? { duration: border.duration } : {}),
            ...(border?.ease ? { ease: border.ease } : {}),
        },
        ...(scale ? { whileHover: { scale } } : {}),
        className,
        style,
        id,
        onClick,
        key: motionKey,
    };

    if (dangerouslySetInnerHTML) {
        return <motion.div {...motionProps} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
    }

    return <motion.div {...motionProps}>{children}</motion.div>;
};

export default FadeInWrapper;
