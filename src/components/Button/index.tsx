import Link from 'next/link';
import styles from './Button.module.scss';

interface Props {
  url: string;
  as: string;
  text: string;
  type?: 'button' | 'link';
}

const Button: React.FC<Props> = ({ url, text, as }) => {
  return (
    <Link href={url} as={as}>
      <a className={styles['button-48']}>
        <span className="text">{text}</span>
      </a>
    </Link>
  );
};
export default Button;
