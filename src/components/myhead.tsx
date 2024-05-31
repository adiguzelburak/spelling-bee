import Head from "next/head";

export default function MyHead() {
  return (
    <Head>
      <title>Spelling Bee!</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta
        name="og:title"
        content="Spelling Bee Türkçe! - Türkçe Kelime Oyunu"
      />
      <meta name="og:type" content="website" />
      <meta
        name="og:description"
        content="Spelling Bee Artık Türkçe! - Türkçe Kelime Bulma Oyunu"
      />
      <meta name="og:image" content="/spell.webp" />
      <meta
        name="description"
        content="Spelling Bee Artık Türkçe! - Türkçe Kelime Bulma Oyunu"
      />
      <meta name="twitter:site" content="@adgzelburak" />
      <meta name="twitter:creator" content="@adgzelburak" />
      <meta
        property="twitter:title"
        content="Spelling Bee Artık Türkçe! - Türkçe Kelime Bulma Oyunu!"
      />
      <meta
        property="twitter:description"
        content="Spelling Bee Artık Türkçe! - Türkçe Kelime Bulma Oyunu!"
      />
      <meta property="twitter:url" content="https://www.spellsbee.net/" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content="/spell.webp" />
    </Head>
  );
}
