import Container from '@/components/Container';

interface Props {
  preview: boolean;
}
const Alert: React.FC<Props> = ({ preview }) => {
  return (
    preview && (
      <Container>
        <div>
          This is page is a preview.
          <a href="/api/exit-preview">Click here</a> to exit preview mode.
        </div>
      </Container>
    )
  );
};
export default Alert;
