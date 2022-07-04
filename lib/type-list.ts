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
    name: "Doctors",
    query: `nwr["amenity"="doctors"](area.b);`,
    tags: '"amenity"="doctors"',
  },
  {
    slug: "museum",
    name: "Museums",
    query: `nwr["tourism"="museum"](area.b);`,
    props: { withOpening: true },
  },
  {
    slug: "hospital",
    name: "Hospitals",
    query: `nwr["amenity"="hospital"](area.b);`,
  },
  {
    slug: "school",
    name: "Schools",
    query: `nwr["amenity"="school"](area.b);`,
    component: "School",
  },
  {
    slug: "restaurant",
    name: "Restaurants",
    query: `nwr["amenity"="restaurant"](area.b);`,
    props: { withOpening: true },
  },
];
