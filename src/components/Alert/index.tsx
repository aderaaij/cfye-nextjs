import Container from '@/components/Container';
import cn from 'classnames';

interface Props {
  preview: boolean;
}
const Alert: React.FC<Props> = ({ preview }) => {
  return (
    preview && (
      <div
        className={cn('border-b', {
          'bg-accent-7 border-accent-7 text-white': preview,
          'bg-accent-1 border-accent-2': !preview,
        })}
      >
        <Container>
          <div className="py-2 text-center text-sm">
            <>
              This is page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          </div>
        </Container>
      </div>
    )
  );
};
export default Alert;
