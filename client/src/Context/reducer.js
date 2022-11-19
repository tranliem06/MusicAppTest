export const actionType = {
  SET_USER: "SET_USER",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_FILTER_TERM: "SET_FILTER_TERM",
  SET_ARTISTS: "SET_ARTISTS",
  SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
  SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  SET_ALL_ALBUMNS: "SET_ALL_ALBUMNS",
  SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
  SET_SONG: "SET_SONG",
  SET_SONG_PLAYING: "SET_SONG_PLAYING",
  SET_MINI_PLAYER: "SET_MINI_PLAYER",

  //************************** */
  GET_HOME: "GET_HOME",
  SET_CUR_SONG_ID: "SET_CUR_SONG_ID",
  PLAY: "PLAY",
  SET_PLAYLIST_ALL_SONG: "SET_PLAYLIST_ALL_SONG",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      };

    case actionType.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };

    case actionType.SET_ARTISTS:
      return {
        ...state,
        artists: action.artists,
      };

    case actionType.SET_ARTIST_FILTER:
      return {
        ...state,
        artistFilter: action.artistFilter,
      };

    case actionType.SET_LANGUAGE_FILTER:
      return {
        ...state,
        languageFilter: action.languageFilter,
      };

    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };

    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };

    case actionType.SET_ALL_ALBUMNS:
      return {
        ...state,
        allAlbums: action.allAlbums,
      };

    case actionType.SET_ALBUM_FILTER:
      return {
        ...state,
        albumFilter: action.albumFilter,
      };

    case actionType.SET_SONG:
      return {
        ...state,
        song: action.song,
      };

    case actionType.SET_SONG_PLAYING:
      return {
        ...state,
        isSongPlaying: action.isSongPlaying,
      };

    case actionType.SET_MINI_PLAYER:
      return {
        ...state,
        miniPlayer: action.miniPlayer,
      };
    case actionType.PLAY:
      return {
        ...state,
        isPlaying: action.isPlaying,
      };

    //*code này đã đc chèn thêm chú ý :()
    // case actionType.GET_HOME:
    //   return state;

    //***************************** */
    //***************************** */
    //***************************** */
    case actionType.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionType === "banner")
            ?.items || null,
      };

    case actionType.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.curSongId || null,
      };

    case actionType.SET_PLAYLIST_ALL_SONG:
      return {
        ...state,
        isPlayListAllSong: action.isPlayListAllSong,
      };

    default:
      return state;
  }
};

export default reducer;
