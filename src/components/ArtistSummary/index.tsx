import Image from 'next/image';
import { stripHtml } from 'string-strip-html';
import { ArtistSummaryFragment } from 'types';
import { limitText } from 'utils/limitCharacters';
import styles from './ArtistSummary.module.scss';
interface Props {
  artist: ArtistSummaryFragment;
}

const ArtistSummary: React.FC<Props> = ({ artist }) => {
  const { artistInformation } = artist;
  console.log({ artist });
  return (
    <div className={styles['artist-summary']}>
      <div className={styles['image-link-wrap']}>
        <div className={styles['avatar-wrap']}>
          <Image
            className={styles['avatar']}
            src={artist.featuredImage.node.thumbnail}
            width={150}
            height={150}
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles['content-wrap']}>
        <h2>About {artist.title}</h2>
        <p>
          {limitText(stripHtml(artistInformation.artistDescription).result, 60)}
        </p>
        <ul className={styles['link-list']}>
          {artistInformation.sltWebsite && (
            <li>
              <a href={artistInformation.sltWebsite}>Website</a>
            </li>
          )}
          {artistInformation.sltInstagram && (
            <li>
              <a
                href={`https://instagram.com.com/${artistInformation.sltInstagram}`}
              >
                Instagram
              </a>
            </li>
          )}
          {artistInformation.sltTwitterid && (
            <li>
              <a href={`https://twitter.com/${artistInformation.sltTwitterid}`}>
                Twitter
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default ArtistSummary;
