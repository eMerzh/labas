import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import GenericList from "../../Components/GenericList";
import SchoolList from "../../Components/SchoolList";
import Map from "../../Components/Map";
import { query } from "../../lib/fetch-overpass";
import { AllLists } from "../../lib/type-list";

export const getStaticProps: GetStaticProps = async (context) => {
  const menuItem = AllLists.find((l) => l.slug == context.params?.type);
  if (!menuItem) {
    return {
      notFound: true,
    };
  }

  const items = await query(menuItem?.query);
  return {
    props: { items, listDefinition: menuItem },
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

const city = "Braine-l'Alleud";

const ItemsList: NextPage = ({
  items,
  listDefinition,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  let innerTable;
  if (listDefinition.component == "School") {
    innerTable = <SchoolList items={items} />;
  } else {
    innerTable = <GenericList items={items} {...listDefinition.props} />;
  }

  return (
    <div className="page-container">
      <h1 className="category">
        <Link href="/">«</Link> {listDefinition.name} in {city}
      </h1>
      <div className="category-head">
        Liste des {items.length} elements de la ville de de {city} d'après les
        données de la carte collaborative OpenStreetMap. En cas d'erreur ou
        d'omission, il suffit de cliquer sur l'icône en début de ligne pour
        modifier ce qui doit l'être... Les élements selectionés ici portent
        l'attribut <code>{listDefinition.tags}</code>
      </div>
      {innerTable}
      <Map items={items} initialLat={50.683627} initialLon={4.3749516} />
      {/* FIXME:  change hardcoded city lat-lon*/}
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
