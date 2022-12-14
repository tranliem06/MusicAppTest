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
  playlistOnOff: false,

  banner: [],
  curSongId: null,
  curPlaylistZing: null,
  isSongZingPlaying: false,

  isLoading: false,
  isLoadingHome: false,

  isCurrentSongVip: false,

  today: {},
  newSongEveryday: {},
  top100: {},
  xone: {},
  newMusic: [],
  newRelease: {},
  weekChart: [],
  favoritedArtist: {},
  chart: {},
  rank: [],

  dataForRenderAlbum: null,

  searchData: null,

  searchSongData: null,
  artistData: null,

  //** STOP PLAYLIST ALL SONG */
  isPlayListAllSong: false,
  isPlayListZing: false,
  //
};
