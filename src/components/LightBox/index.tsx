interface Props {
  active: boolean;
  image: string;
}

export const LightBox: React.FC<Props> = ({ active, image }) => {
  return (
    <div>
      <button>close</button>
      <img src={image} />
    </div>
  );
};
