import type { NextPage } from "next";
import Link from "next/link";
import Meta from "../Components/Head";
import { CURRENT_CITY } from "../lib/type-city";
import { AllLists } from "../lib/type-list";

const Home: NextPage = () => {
  return (
    <>
      <Meta
        title={`Là-bas à ${CURRENT_CITY.name}`}
        description={`Tous les points d'intéret ${CURRENT_CITY.name}`}
      />

      <main>
        <div>
          <h1>Là-bas… à {CURRENT_CITY.name}</h1>
          <ul>
            {AllLists.map((listItem) => {
              return (
                <li key={listItem.slug} className="pages-link">
                  <Link href={`/list/${CURRENT_CITY.slug}/${listItem.slug}`}>
                    {listItem.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Home;
