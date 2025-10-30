const Title = () => {
  return (
    <div className="flex flex-col items-start gap-6 w-full">
      <h1 className="w-full font-['Inter-Bold',Helvetica] font-bold text-black text-[64px] tracking-[-1.28px] leading-normal">
        Jun&apos;s BLOG
      </h1>

      <p className="w-full flex items-center justify-start font-subheading font-(--subheading-font-weight) text-[#000000bf] text-(length:--subheading-font-size) tracking-(--subheading-letter-spacing) leading-(--subheading-line-height) [font-style:var(--subheading-font-style)]">
        ～平凡なエンジニアのテックブログ～
      </p>
    </div>
  );
};

export default Title;
