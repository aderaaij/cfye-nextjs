import { User } from 'types';
interface Props {
  author: User;
  isEven?: boolean;
}

const Avatar: React.FC<Props> = ({ author }) => {
  const name =
    author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name;

  return (
    <div>
      <img src={author.avatar.url} alt={name} />
      <div>{name}</div>
    </div>
  );
};
export default Avatar;
