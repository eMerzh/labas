import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import GenericList from "../../Components/GenericList";
import SchoolList from "../../Components/SchoolList";
import { query } from "../../lib/fetch-overpass";
import { AllLists } from "../../lib/type-list";


export const getStaticProps: GetStaticProps = async (context) => {
    const menuItem = AllLists.find(l => l.slug == context.params?.type)
    if (!menuItem) {
        return {
            notFound: true,
        }
    }

    const items = await query(menuItem?.query)
    return {
        props: { items, listDefinition: menuItem },
    }
}

export async function getStaticPaths() {
    return {
        paths: AllLists.map(l => { return { params: { type: l.slug } } }),
        fallback: false
    };
}

const city = "Braine-l'Alleud"

const ItemsList: NextPage = ({ items, listDefinition }: InferGetStaticPropsType<typeof getStaticProps>) => {

    let innerTable
    if (listDefinition.component == 'School') {
        innerTable = <SchoolList items={items} />
    } else {
        innerTable = <GenericList items={items} {...listDefinition.props} />
    }

    return <>
        <h1 className="category">
            <Link href="/">«</Link> {listDefinition.name} in {city}
        </h1>
        <div className="category-head">
            Liste des {items.length} elements de la ville de de {city} d'après les données de
            la carte collaborative OpenStreetMap. Sur OSM, on catégorise les écoles par le tag suivant:
            amenity=school.
            En cas d'erreur ou d'omission, il suffit de cliquer sur l'icône
            en début de ligne pour modifier ce qui doit l'être...
        </div>
        {innerTable}
    </>

}

export default ItemsList