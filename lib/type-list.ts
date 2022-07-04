export interface PageType {
  slug: string;
  name: string;
  query: string;
  props?: object;
  component?: string;
  tags?: string;
}
export const AllLists: PageType[] = [
  {
    slug: "doctor",
    name: "Docteurs",
    query: `nwr["amenity"="doctors"](area.b);`,
    tags: '"amenity"="doctors"',
  },
  {
    slug: "museum",
    name: "Musées",
    query: `nwr["tourism"="museum"](area.b);`,
    props: { withOpening: true },
    tags: '"tourism"="museum"',
  },
  {
    slug: "hospital",
    name: "Hopitaux",
    query: `nwr["amenity"="hospital"](area.b);`,
    tags: '"amenity"="hospital"',
  },
  {
    slug: "school",
    name: "Écoles",
    query: `nwr["amenity"="school"](area.b);`,
    component: "School",
    tags: '"amenity"="school"',
  },
  {
    slug: "restaurant",
    name: "Restaurants",
    query: `nwr["amenity"="restaurant"](area.b);`,
    props: { withOpening: true },
    tags: '"amenity"="restaurant"',
  },
  {
    slug: "pharmacy",
    name: "Pharmacies",
    query: `nwr["amenity"="pharmacy"](area.b);`,
    props: { withOpening: true },
    tags: '"amenity"="pharmacy"',
  },
  {
    slug: "shop-bicycle",
    name: "Marchants de vélo",
    query: `nwr["shop"="bicycle"](area.b);`,
    props: { withOpening: true },
    tags: '"shop"="bicycle"',
  },
  {
    slug: "shop-butcher",
    name: "Boucher",
    query: `nwr["shop"="butcher"](area.b);`,
    props: { withOpening: true },
    tags: '"shop"="butcher"',
  },
];
