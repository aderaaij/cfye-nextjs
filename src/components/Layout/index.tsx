import Alert from '@/components/Alert';
import Meta from '@/components/Meta';
import { motion } from 'framer-motion';

interface Props {
  preview: boolean;
}

const Layout: React.FC<Props> = ({ preview, children }) => {
  return (
    <>
      <Meta />
      <Alert preview={preview} />
      <main>{children}</main>
    </>
  );
};
export default Layout;
