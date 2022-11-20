export const initialState = {
  user: null,
  searchTerm: "",
  filterTerm: "all",
  artists: null,
  artistFilter: null,
  languageFilter: null,
  allUsers: null,
  allSongs: null,
  allAlbums: null,
  albumFilter: null,
  song: 0,
  isSongPlaying: false,
  miniPlayer: false,

  //**TEST FOR ZINGMP3 */
  banner: [],
  curSongId: null,
  curPlaylistZing: null,
  isSongZingPlaying: false,

  isCurrentSongVip: false,

  today: {},
  newSongEveryday: {},
  top100: {},
  xone: {},

  //** STOP PLAYLIST ALL SONG */
  isPlayListAllSong: false,
  isPlayListZing: false,
  //
};
