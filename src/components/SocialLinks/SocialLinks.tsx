import { ArtistSummaryFragment } from 'types';
import styles from './SocialLinks.module.scss';
import sprite from '/public/sprite.svg';

interface Props {
  artistInformation: ArtistSummaryFragment['artistInformation'];
}

export const SocialLinks: React.FC<Props> = ({ artistInformation }) => {
  return (
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
          <a href={`https://instagram.com/${artistInformation.sltInstagram}`}>
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
  );
};
