import Link from 'next/link';

interface Props {
  text: string;
  link: string;
  current?: boolean;
}

const MenuItem: React.FC<Props> = ({ text, link }) => {
  return (
    <Link href={link}>
      <a>{text}</a>
    </Link>
  );
};

export default MenuItem;
