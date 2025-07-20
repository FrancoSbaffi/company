declare module 'gray-matter' {
  interface GrayMatterFile<I> {
    data: { [key: string]: any };
    content: string;
    excerpt?: string;
    orig: Buffer | string;
    language: string;
    matter: string;
    stringify(lang?: string): string;
  }

  interface GrayMatterOptions {
    parser?: any;
    eval?: boolean;
    excerpt?: boolean | ((file: GrayMatterFile<any>, options: GrayMatterOptions) => string);
    excerpt_separator?: string;
    engines?: { [key: string]: any };
    language?: string;
    delimiters?: string | [string, string];
  }

  function matter<I = any>(
    input: string | Buffer,
    options?: GrayMatterOptions
  ): GrayMatterFile<I>;

  export = matter;
}

declare module 'react-fast-marquee' {
  import React from 'react';
  
  interface MarqueeProps {
    style?: React.CSSProperties;
    className?: string;
    autoFill?: boolean;
    play?: boolean;
    pauseOnHover?: boolean;
    pauseOnClick?: boolean;
    direction?: 'left' | 'right' | 'up' | 'down';
    speed?: number;
    delay?: number;
    loop?: number;
    gradient?: boolean;
    gradientColor?: string;
    gradientWidth?: number | string;
    onFinish?: () => void;
    onCycleComplete?: () => void;
    onMount?: () => void;
    children?: React.ReactNode;
  }

  const Marquee: React.FC<MarqueeProps>;
  export default Marquee;
}
