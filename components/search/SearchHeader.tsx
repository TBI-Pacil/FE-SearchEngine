'use client';

import SearchBar from '@/components/search/SearchBar';
import { cn } from '@/lib/utils';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

type SearchHeaderProps = {
  q: string;
};

export default function SearchHeader({ q }: Readonly<SearchHeaderProps>) {
  const headerRef = useRef(null);
  const spacerRef = useRef(null);

  const isInView = useInView(spacerRef);
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ['end start', '200% start'],
  });
  const topOffsetProgress = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  const initialRender = !isInView && topOffsetProgress.get() === -100;

  return (
    <>
      <motion.header
        className={cn(
          'left-0 right-0 z-10 flex flex-col gap-2 bg-white/30 p-2 backdrop-blur-sm sm:flex-row sm:gap-6 sm:px-6 sm:pb-1 sm:pt-6',
          {
            absolute: isInView,
            fixed: !isInView,
          },
        )}
        ref={headerRef}
        style={{ top: isInView || initialRender ? 0 : topOffsetProgress }}
      >
        <Link
          href="/"
          className="flex flex-shrink-0 items-center justify-center gap-2 sm:justify-start"
        >
          <Image
            src="/icon.svg"
            alt="Logo"
            width={32}
            height={32}
            loading="eager"
            priority
          />
          <p className="text-2xl font-semibold leading-8 sm:hidden lg:block">
            Covearch
          </p>
        </Link>
        <SearchBar className="sm:w-[500px]" defaultValue={q} />
      </motion.header>
      <div className="h-[104px] sm:h-[72px]" ref={spacerRef}></div>
    </>
  );
}
