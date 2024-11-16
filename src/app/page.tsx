'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <Button variant="outline" className="rounded-full mb-7 text-sm p-5 text-zinc-400">
        <Link href="https://github.com/verodb/verokv" passHref
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-300"
          >
            Star OrdoX on&nbsp;<span className="text-zinc-200">Github ⭐</span>
        </Link>
      </Button>
      <h1 className="scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-b from-zinc-200 to-zinc-400 text-transparent bg-clip-text text-center">
        Share data Securely
      </h1>
      <p className="text-zinc-500 leading-7 [&:not(:first-child)]:mt-6 text-center text-l mb-10">
      Securely encrypt your data. Decryption requests are rate-limited to enhance security,<br />  ensuring safe and controlled access to your encrypted information.
      </p>

      <div className="mt-8 flex flex-col md:flex-row gap-3">
        <Link href="/encrypt">
      <Button className="font-bold p-6 rounded-l w-[250px]" type='button'>
        Encrypt
      </Button>
      </Link>
      <Link href="/decrypt">
      <Button className="font-bold p-6 rounded-l w-[250px] bg-zinc-900 text-zinc-50 border border-zinc-700 hover:bg-zinc-700">
        Decrypt
      </Button>
      </Link>
    </div>
    </main>
  );
}