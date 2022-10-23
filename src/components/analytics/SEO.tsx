import siteMetadata from '@src/core/config/siteMetadata';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface CommonSEOProps {
  title: string;
  description: string;
  ogType: string;
  ogImage:
    | string
    | {
        '@type': string;
        url: string;
      }[];
}

const CommonSEO = ({ title, description, ogType, ogImage }: CommonSEOProps) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {Array.isArray(ogImage) ? (
        ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
    </Head>
  );
};

interface PageSEOProps {
  title: string;
  description: string;
}

export const PageSEO = ({ title, description }: PageSEOProps) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
  return (
    <CommonSEO title={title} description={description} ogType="website" ogImage={ogImageUrl} />
  );
};
