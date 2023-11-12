"use client";

import React, { useEffect, useRef } from "react";

import Prism from "prismjs";
import parse from "html-react-parser";

import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-r";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-mongodb";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { toast } from "../ui/use-toast";

interface Props {
  data: string;
}

const ParseHTML = ({ data }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleCopyClick = () => {
    if (divRef.current) {
      // Select the text content of the div
      const textToCopy = divRef.current.innerText;

      // Use the Clipboard API to copy the text to the clipboard
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          return toast({
            title: 'Copied to clipboard',
            description: 'The code has been copied to your clipboard.',
            variant: 'default',
          })
        })
        .catch((error) => {
          console.error('Unable to copy to clipboard', error);
        });
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <div className="markdown w-full min-w-full hover:scale-105 transition-transform cursor-pointer" ref={divRef}
  onClick={handleCopyClick}>{parse(data)}</div>;
};

export default ParseHTML;
