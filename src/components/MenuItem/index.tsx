import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  text: string;
  link: string;
  current?: boolean;
}

const MenuItem: React.FC<Props> = ({ text, link }) => {
  return (
    <li>
      <Link href={link}>
        <a>{text}</a>
      </Link>
    </li>
  );
};

export default MenuItem;
