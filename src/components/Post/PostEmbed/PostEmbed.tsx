import parse, { Text } from 'html-react-parser';
interface Props {
  content: string;
}
export const PostEmbed: React.FC<Props> = ({ content }) => {
  const youtubeParser = (url): string => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11
      ? `https://www.youtube.com/embed/${match[7]}`
      : '';
  };

  const returnVideoUrl = (url: string): string => {
    const trim = url.replace(/^\s+|\s+$/g, '');
    if (trim.includes('vimeo')) {
      const m = trim.match(/^.+vimeo.com\/(.*\/)?([^#\?]*)/);
      return m
        ? `https://player.vimeo.com/video/${m[2]}` ||
            `https://player.vimeo.com/video/${m[1]}`
        : null;
    }
    if (trim.includes('you')) {
      return youtubeParser(trim);
    }
  };
  return (
    <>
      {content
        ? parse(content, {
            replace: (domNode: Text) => {
              if (domNode.type === 'text' && domNode.data) {
                return (
                  <iframe
                    src={returnVideoUrl(domNode.data)}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  ></iframe>
                );
              }
            },
          })
        : null}
    </>
  );
};
