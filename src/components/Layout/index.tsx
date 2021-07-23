import Alert from '@/components/Alert';
import Meta from '@/components/Meta';
import cx from 'classnames';

interface Props {
  preview: boolean;
  pageType?: 'home' | 'artist';
}

const Layout: React.FC<Props> = ({ preview, children, pageType }) => {
  return (
    <>
      <Meta />
      <Alert preview={preview} />
      <main
        className={cx('main', {
          [`main--${pageType}`]: pageType,
        })}
      >
        {children}
      </main>
    </>
  );
};
export default Layout;
