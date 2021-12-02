import Link from 'next/link';
import { Container } from '@/components/Common';

interface Props {
  preview: boolean;
}

export const Alert: React.FC<Props> = ({ preview }) => {
  return (
    preview && (
      <Container>
        <div>
          This is page is a preview.
          <Link href="/api/exit-preview">Click here</Link> to exit preview mode.
        </div>
      </Container>
    )
  );
};
