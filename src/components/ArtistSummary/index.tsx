import Image from 'next/image';
import Link from 'next/link';
import { stripHtml } from 'string-strip-html';
import { ArtistSummaryFragment } from 'types';
import { limitText } from 'utils/limitCharacters';
import sprite from '../../../public/sprite.svg';
import styles from './ArtistSummary.module.scss';
interface Props {
  artist: ArtistSummaryFragment;
}

const ArtistSummary: React.FC<Props> = ({ artist }) => {
  const { artistInformation } = artist;
  return (
    <div className={styles['artist-summary']}>
      <div className={styles['image-link-wrap']}>
        <div className={styles['avatar-wrap']}>
          <Link as={`/artists/${artist.slug}`} href="/artists/[slug]">
            <a>
              <Image
                className={styles['avatar']}
                src={artist.featuredImage.node.thumbnail}
                width={150}
                height={150}
                objectFit="contain"
              />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles['content-wrap']}>
        <h2>
          <Link as={`/artists/${artist.slug}`} href="/artists/[slug]">
            <a>About {artist.title}</a>
          </Link>
        </h2>
        <p>
          {limitText(
            stripHtml(artistInformation.artistDescription).result,
            200
          )}
        </p>
        <ul className={styles['link-list']}>
          {artistInformation.sltWebsite && (
            <li>
              <a href={artistInformation.sltWebsite}>
                <svg>
                  <use xlinkHref={sprite.src + '#link-outline'}></use>
                </svg>
              </a>
            </li>
          )}
          {artistInformation.sltInstagram && (
            <li>
              <a
                href={`https://instagram.com.com/${artistInformation.sltInstagram}`}
              >
                <svg>
                  <use xlinkHref={sprite.src + '#logo-instagram'}></use>
                </svg>
              </a>
            </li>
          )}
          {artistInformation.sltTwitterid && (
            <li>
              <a href={`https://twitter.com/${artistInformation.sltTwitterid}`}>
                <svg>
                  <use xlinkHref={sprite.src + '#logo-twitter'}></use>
                </svg>
              </a>
            </li>
          )}
          {artistInformation.sltYoutubeid && (
            <li>
              <a href={artistInformation.sltYoutubeid}>
                <svg>
                  <use xlinkHref={sprite.src + '#folder'}></use>
                </svg>
              </a>
            </li>
          )}
          {artistInformation.flickrUsername && (
            <li>
              <a
                href={`https://flickr.com/photos/${artistInformation.flickrUsername}`}
              >
                <svg>
                  <use xlinkHref={sprite.src + '#image'}></use>
                </svg>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default ArtistSummary;
