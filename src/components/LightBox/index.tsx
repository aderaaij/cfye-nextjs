import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './post-body.module.css';
import cn from 'classnames';

interface Props {
  active: boolean;
  image: string;
}

export const LightBox: React.FC<Props> = ({ active, image }) => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 0 },
  };
  return (
    <motion.div
      animate={active ? 'open' : 'closed'}
      variants={variants}
      className={cn(
        'fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-75 p-16',
        {
          'pointer-events-none': !active,
        }
      )}
    >
      <div className="relative overflow-hidden h-full flex justify-center">
        <button className="top-0 right-0 fixed">close</button>
        <img
          className="absolute top-0 left-0 w-full h-full object-contain block mx-auto"
          src={image}
        />
      </div>
    </motion.div>
  );
};
