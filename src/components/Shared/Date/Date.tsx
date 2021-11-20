import { parseISO, format } from 'date-fns';
import styles from './Date.module.scss';
interface Props {
  dateString: string;
}
export const Date: React.FC<Props> = ({ dateString }) => {
  const date = parseISO(dateString);
  return (
    <time className={styles['time']} dateTime={dateString}>
      {format(date, 'LLLL	d, yyyy')}
    </time>
  );
};
