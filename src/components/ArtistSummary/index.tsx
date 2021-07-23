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
          {limitText(
            stripHtml(artistInformation.artistDescription).result,
            200
          )}
        </p>
        <ul className={styles['link-list']}>
          {artistInformation.sltWebsite && (
            <li>
              <a href={artistInformation.sltWebsite}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <title>Website</title>
                  <path
                    d="M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="36"
                  />
                </svg>
              </a>
            </li>
          )}
          {artistInformation.sltInstagram && (
            <li>
              <a
                href={`https://instagram.com.com/${artistInformation.sltInstagram}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <title>Logo Instagram</title>
                  <path
                    stroke="currentColor"
                    d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"
                  />
                  <path
                    stroke="currentColor"
                    d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"
                  />
                </svg>
              </a>
            </li>
          )}
          {artistInformation.sltTwitterid && (
            <li>
              <a href={`https://twitter.com/${artistInformation.sltTwitterid}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <title>Twitter</title>
                  <path
                    d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z"
                    stroke="currentColor"
                  />
                </svg>
              </a>
            </li>
          )}
          {artistInformation.sltYoutubeid && (
            <li>
              <a href={artistInformation.sltYoutubeid}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <title>Youtube</title>
                  <path d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z" />
                </svg>
              </a>
            </li>
          )}
          {artistInformation.flickrUsername && (
            <li>
              <a
                href={`https://flickr.com/photos/${artistInformation.flickrUsername}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <title>Youtube</title>
                  <path d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z" />
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
