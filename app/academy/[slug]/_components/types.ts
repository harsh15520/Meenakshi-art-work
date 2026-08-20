import { getArtistProfile } from "@/data/artists";

export type Artist = NonNullable<ReturnType<typeof getArtistProfile>>;
