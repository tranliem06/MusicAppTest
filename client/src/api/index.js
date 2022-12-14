import axios from "axios";
import axios2 from "../axios2";

const baseURL = "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtist = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artists/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = axios.delete(`${baseURL}api/users/delete/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/albums/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changingUserRole = async (userId, role) => {
  try {
    const res = axios.put(`${baseURL}api/users/updateRole/${userId}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const saveNewArtist = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/artists/save`, { ...data });
    return (await res).data.artist;
  } catch (error) {
    return null;
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/albums/save`, { ...data });
    return (await res).data.album;
  } catch (error) {
    return null;
  }
};

export const saveNewSong = async (data) => {
  try {
    const res = axios.post(`${baseURL}api/songs/save`, { ...data });
    return (await res).data.song;
  } catch (error) {
    return null;
  }
};

export const deleteSongById = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/songs/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

//*********************** */
export const getSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios2({
        url: "/song",
        method: "get",
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getDetailSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios2({
        url: "/infosong",
        method: "get",
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const GetDetailPlaylist = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios2({
        url: "/detailplaylist",
        method: "get",
        params: { id: pid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const GetSearchData = (keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios2({
        url: "/search",
        method: "get",
        params: { keyword },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const GetSearchSongs = (singerId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios2({
        url: "/artistsong",
        method: "get",
        params: {
          id: singerId,
          page: 1,
          count: 50,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const GetArtist = (alias) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios2({
        url: "/artist",
        method: "get",
        params: {
          name: alias,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
