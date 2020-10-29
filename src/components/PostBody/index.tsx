import { useEffect, useRef, useState } from 'react';
import { LightBox } from '@/components/LightBox';
import styles from './post-body.module.css';

interface Props {
  content: string;
}
const PostBody: React.FC<Props> = ({ content }) => {
  const postContentRef = useRef(null);
  const [image, setImage] = useState<string>(null);
  const [modalActive, setModelActive] = useState<boolean>(false);

  useEffect(() => {
    const imageLinks = postContentRef.current.querySelectorAll('figure > a');
    imageLinks.forEach((imageLink) => {
      imageLink.addEventListener('click', function (e) {
        console.log(e.target.dataset.fullUrl);
        setModelActive(true);
        setImage(e.target.dataset.fullUrl);
        e.preventDefault();
      });
    });
  }, [postContentRef]);
  return (
    <>
      <div className="post-body  pb-16">
        <div
          ref={postContentRef}
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* <LightBox active={modalActive} image={image} /> */}
    </>
  );
};

export default PostBody;
