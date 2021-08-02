import cx from 'classnames';
import { PostExcerptFieldsFragment } from 'types';
import styles from './ExcerptsSmall.module.scss';
import Excerpt from '@/components/Excerpt';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  edges: Array<PostExcerptFieldsFragment>;
  rowSize?: number;
}

const ExcerptsSmall: React.FC<Props> = ({ edges, rowSize }) => {
  const [isOpen, setOpen] = useState(false);
  const [containerRef, inView] = useInView({ threshold: 0.2 });

  const variants = {
    open: {
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  useEffect(() => {
    if (inView) {
      setOpen(true);
    }
  }, [inView]);
  return (
    <motion.div
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      ref={containerRef}
      className={cx(styles['wrap'], {
        [styles[`wrap--${rowSize}`]]: rowSize,
      })}
    >
      {edges.map(({ node }) => (
        <Excerpt
          key={node.id}
          node={node}
          type={rowSize === 3 ? 'small' : null}
        />
      ))}
    </motion.div>
  );
};

export default ExcerptsSmall;
