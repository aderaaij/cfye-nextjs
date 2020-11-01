import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface Props {
  text: string;
  link: string;
  current?: boolean;
}

const MenuItem: React.FC<Props> = ({ text, link }) => {
  const router = useRouter();
  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  };

  return (
    <motion.li
      className="relative my-6"
      variants={variants}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 1 }}
    >
      <Link href={link}>
        <a
          className={cn(
            'text-cfye font-header text-6xl relative pl-4 font-medium inline-block leading-none uppercase',
            {}
          )}
        >
          {router.asPath === link && (
            <motion.div
              layoutId="outline"
              className="bg-cfye w-1 h-full absolute left-0 top-0"
              initial={false}
              animate={{ borderColor: 'blue' }}
              transition={spring}
            />
          )}
          {text}
        </a>
      </Link>
    </motion.li>
  );
};

export default MenuItem;
