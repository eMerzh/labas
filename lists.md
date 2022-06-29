# list of lists

Commerces Friteries, Agences immobilières, Fleuristes, Chaussures, Centres commerciaux, Librairies, Magasins, Vêtements, Meubles, Jouets, Bricolage, Magasins bio, Cadeaux, Salons de coiffure, Boulangeries, Bijouteries, Animaleries, Boucheries, Supermarchés, Agences de voyages Enfants Écoles, Plaines de jeux, Crèches Loisirs Bibliothèques, ONG, Stades, Cinémas, Musées, Piscines, Restaurants, Théâtres Nature Forêts, Parcs Patrimoine Châteaux, Mémoriaux, Oeuvres d'art, Attractions touristiques, Tombes célèbres, Cimetières Santé Pharmacies, Vétérinaires, Opticiens, Hôpitaux, Dentistes, Défibrillateurs, Médecins Services Banques, Ambassades, Lieux de culte, Casernes de pompiers, Bureaux de poste, Pompes funèbres, Maisons de repos Tourisme Hôtels, Auberges de jeunesse, Chambres d'hôtes Transports Stations Villo!, Stations de métro, Marchands de vélos, Concessionnaires automobiles, Auto-écoles, Gares

"amenity"="fast_food" accompagné de "cuisine"="friture"
"office"="estate_agent"
"shop"="florist" (phone + is open)
"shop"="shoes"(isopen)
"shop"="mall" (phone + is open)
"shop"="books" (web + isOpen)
"shop"="\*"
"shop"="clothes"
"shop"="furniture"
"shop"="toys"
"shop"="doityourself"
"shop"="" accompagné de "organic"="only"
"shop"="gift"
"shop"="hairdresser"
"shop"="bakery"
"shop"="jewelry"
"shop"="pet"
"shop"="butcher"
"shop"="supermarket" (+ operator)
"shop"="travel_agency"

"amenity"="school"
"leisure"="playground"
"amenity"="kindergarten" (creche)
"amenity"="library" (biblio)
"office"="ngo"
"leisure"="stadium"
"amenity"="cinema"
"tourism"="museum" (wikipedia + wikip img)
"leisure"="swimming_pool" (exc nwr["leisure"="swimming_pool"]["access"!="private"]["swimming_pool"!="personal"]({{bbox}}); )
"amenity"="restaurant"
"amenity"="theatre"
"landuse"="forest"
"leisure"="park"

"historic"="castle"
"historic"="memorial"
"tourism"="artwork"
"tourism"="attraction" (??)
"landuse"="cemetery"

"amenity"="pharmacy"
"shop"="optician"
"amenity"="hospital" (Urgences YEs/NO)
"amenity"="veterinary"
"emergency"="defibrillator (??)
"amenity"="dentist"
"amenity"="doctors"

"amenity"="bank" ( ATM Y/N)
"amenity"="place_of_worship"
"amenity"="fire_station"
"amenity"="post_office"
"amenity"="embassy" (??)
"amenity"="social_facility" accompagné de "social_facility"="group_home".
"shop"="funeral_directors"

"tourism"="hotel"
"tourism"="hostel"
"tourism"="guest_house"

--vilo
"amenity"="driving_school" (??)
"railway"="station" accompagné de "operator"="NMBS/SNCB" (with PMR)
shop"="bicycle"
"shop"="car" (?? brands?)
