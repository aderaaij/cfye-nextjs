import { User } from 'types';
import cn from 'classnames';
interface Props {
  author: User;
  isEven?: boolean;
}

const Avatar: React.FC<Props> = ({ author, isEven }) => {
  const name =
    author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name;

  return (
    <div
      className={cn('flex items-center', {
        'lg:justify-end': !isEven,
      })}
    >
      <img
        src={author.avatar.url}
        className="w-12 h-12 rounded-full mr-4"
        alt={name}
      />
      <div className="text-xl font-header font-medium">{name}</div>
    </div>
  );
};
export default Avatar;
