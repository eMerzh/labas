import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
import GenericList from "../../../Components/GenericList";
import SchoolList from "../../../Components/SchoolList";
import RestaurantList from "../../../Components/RestaurantList";
import Map from "../../../Components/Map";
import { query, ResultItem } from "../../../lib/fetch-overpass";
import { AllLists, PageType } from "../../../lib/type-list";

import {
  getContributors,
  getCountHistory,
  getCurrentItems,
  saveResults,
  TimeCountResult,
  UserCountResut,
} from "../../../lib/fetch-history";
import EvolutionChart from "../../../Components/EvolutionChart";
import ContributorsChart from "../../../Components/ContributorsChart";
import { CityItem, CURRENT_CITY } from "../../../lib/type-city";
import Meta from "../../../Components/Head";

export const getStaticProps = async (context) => {
  const menuItem = AllLists.find((l) => l.slug == context.params?.type);
  const cityItem = CURRENT_CITY; //TAKEN FROM context.params?.type
  if (!menuItem) {
    return {
      notFound: true,
      props: {},
    };
  }

  let items = await getCurrentItems(cityItem.slug, menuItem.slug);

  if (items === null) {
    // fetch them on overpass
    items = await query(menuItem?.query);
    await saveResults(cityItem.slug, menuItem.slug, items);
  }

  const history = await getCountHistory(cityItem.slug, menuItem.slug);
  const contributors = await getContributors(cityItem.slug, menuItem.slug);

  return {
    props: {
      city: cityItem,
      items,
      history: JSON.parse(JSON.stringify(history)), // trickery to allow dates in props
      contributors,
      listDefinition: menuItem,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: AllLists.map((l) => {
      return { params: { city: CURRENT_CITY.slug, type: l.slug } };
    }),
    fallback: false,
  };
};

const ItemsList = ({
  city,
  items,
  history,
  listDefinition,
  contributors,
}: {
  city: CityItem;
  items: ResultItem[];
  listDefinition: PageType;
  history: TimeCountResult;
  contributors: UserCountResut;
}) => {
  let innerTable;
  if (listDefinition.component == "School") {
    innerTable = <SchoolList items={items} />;
  } else if (listDefinition.component == "Restaurant") {
    innerTable = <RestaurantList items={items} />;
  } else {
    innerTable = <GenericList items={items} {...listDefinition.props} />;
  }

  return (
    <div className="page-container">
      <Meta
        title={`${listDefinition.name} à ${city.name}`}
        description={`Tout sur ${city.name}`}
      />

      <h1 className="category">
        <Link href="/">«</Link> {listDefinition.name} à {city.name}
      </h1>
      <div className="category-head">
        Liste des {items.length} elements de la ville de {city.name} d'après les
        données de la carte collaborative OpenStreetMap. En cas d'erreur ou
        d'omission, il suffit de cliquer sur l'icône en début de ligne pour
        modifier ce qui doit l'être… Les élements selectionés ici portent
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
