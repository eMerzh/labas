import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import GenericList from "../../Components/GenericList";
import SchoolList from "../../Components/SchoolList";
import Map from "../../Components/Map";
import { query } from "../../lib/fetch-overpass";
import { AllLists } from "../../lib/type-list";
import Head from "next/head";
import {
  getContributors,
  getCountHistory,
  getCurrentItems,
  saveResults,
} from "../../lib/fetch-history";
import EvolutionChart from "../../Components/EvolutionChart";
import ContributorsChart from "../../Components/ContributorsChart";
import { CURRENT_CITY } from "../../lib/type-city";

export const getStaticProps: GetStaticProps = async (context) => {
  const menuItem = AllLists.find((l) => l.slug == context.params?.type);
  if (!menuItem) {
    return {
      notFound: true,
    };
  }

  const city = CURRENT_CITY;
  let items = await getCurrentItems(city.slug, menuItem.slug);

  if (items === null) {
    // fetch them on overpass
    items = await query(menuItem?.query);
    await saveResults(city.slug, menuItem.slug, items);
  }

  const history = await getCountHistory(city.slug, menuItem.slug);
  const contributors = await getContributors(city.slug, menuItem.slug);

  return {
    props: {
      city,
      items,
      history: JSON.parse(JSON.stringify(history)), // trickery to allow dates in props
      contributors,
      listDefinition: menuItem,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: AllLists.map((l) => {
      return { params: { type: l.slug } };
    }),
    fallback: false,
  };
}

const ItemsList: NextPage = ({
  city,
  items,
  history,
  listDefinition,
  contributors,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  let innerTable;
  if (listDefinition.component == "School") {
    innerTable = <SchoolList items={items} />;
  } else {
    innerTable = <GenericList items={items} {...listDefinition.props} />;
  }

  return (
    <div className="page-container">
      <Head>
        <title>
          {listDefinition.name} à {city.name}
        </title>
        <meta name="description" content={`Tout sur ${city.name}`} />
      </Head>

      <h1 className="category">
        <Link href="/">«</Link> {listDefinition.name} à {city.name}
      </h1>
      <div className="category-head">
        Liste des {items.length} elements de la ville de {city.name} d'après les
        données de la carte collaborative OpenStreetMap. En cas d'erreur ou
        d'omission, il suffit de cliquer sur l'icône en début de ligne pour
        modifier ce qui doit l'être... Les élements selectionés ici portent
        l'attribut <code>{listDefinition.tags}</code>
      </div>
      {innerTable}
      <Map
        items={items}
        initialLat={city.center.lat}
        initialLon={city.center.lon}
        outerBox={city.bbox}
      />
      <div className="charts-container">
        <ContributorsChart
          data={contributors}
          title={`Contributeurs sur OpenStreetMap`}
          dataType={listDefinition.name}
        />
        <EvolutionChart
          data={history}
          title={`${listDefinition.name} à ${city.name} encodés sur Openstreetmap`}
        />
      </div>
      <footer>
        Les tableaux et les cartes ci-dessus sont générés a partir de la base de
        données collaborative OpenStreetMap. Compléter les données
        d'Openstreetmap c'est aussi améliorer ces listes.
        <br />
        <a href="https://github.com/eMerzh/labas">
          https://github.com/eMerzh/labas
        </a>
      </footer>
    </div>
  );
};

export default ItemsList;
