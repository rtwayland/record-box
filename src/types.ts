type Artist = {
  name: string;
  id: number;
};

export type Record = {
  id: string;
  albumColor: string;
  album_title: string;
  year: number;
  condition: string;
  artist: Artist;
};
