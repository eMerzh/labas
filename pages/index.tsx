import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { AllLists } from '../lib/type-list'


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ici ou Là-bas</title>
        <meta name="description" content="Tout sur la ville" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h1>
            Ici ou Là-bas...
            à Braine-l&apos;Alleud
          </h1>
          <ul>
            {AllLists.map(listItem => {
              return (
                <li key={listItem.slug} className="pages-link">
                  <Link href={`/list/${listItem.slug}`}>
                    {listItem.name}
                  </Link>
                </li>)
            })}

          </ul>
        </div>
      </main>
    </>)

}

export default Home
