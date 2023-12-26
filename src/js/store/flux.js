import { fetchDetails, fetchList } from '../utils/apiCalls.js'

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characters: [],
      planets: [],
      vehicles: [],
      nextPageURLs: {
        characters: '',
        planets: '',
        vehicles: '',
      },
      favoritesUIDs: {
        characters: [],
        planets: [],
        vehicles: [],
      },
      readLaterUIDs: {
        characters: [],
        planets: [],
        vehicles: [],
      },
    },
    actions: {
      loadList: async ({ type, nextPage }) => {
        const url = getStore().nextPageURLs[type]
        const response = await fetchList({
          url: nextPage ? url : null,
          type,
        })
        setStore({
          nextPageURLs: { ...getStore().nextPageURLs, [type]: response.next },
          [type]: [...getStore()[type], ...response.results],
        })
      },
      loadNextPage: (type) => {
        getActions().loadList({
          nextPage: true,
          type,
        })
      },
      loadDetails: async ({ type, uid }) => {
        const response = await fetchDetails({ type, uid })
        return response
      },
      addToFavorites: ({ uid, type }) => {
        const itemToAdd = getStore()[`${type}s`].find((el) => el.uid === uid)
        if (itemToAdd)
          setStore({
            favoritesUIDs: {
              ...getStore().favoritesUIDs,
              [`${type}s`]: [...getStore().favoritesUIDs[`${type}s`], uid],
            },
          })
      },
      removeFromFavorites({ uid, type }) {
        const newFavorites = getStore().favoritesUIDs[`${type}s`].filter(
          (favUID) => favUID !== uid
        )
        setStore({
          favoritesUIDs: {
            ...getStore().favoritesUIDs,
            [`${type}s`]: newFavorites,
          },
        })
      },
      addToReadLater: ({ uid, type }) => {
        const itemToAdd = getStore()[`${type}s`].find((el) => el.uid === uid)
        if (itemToAdd)
          setStore({
            readLaterUIDs: {
              ...getStore().readLaterUIDs,
              [`${type}s`]: [...getStore().readLaterUIDs[`${type}s`], uid],
            },
          })
      },
      removeFromReadLater({ uid, type }) {
        const newReadLater = getStore().readLaterUIDs[`${type}s`].filter(
          (readLaterUID) => readLaterUID !== uid
        )
        setStore({
          readLaterUIDs: {
            ...getStore().readLaterUIDs,
            [`${type}s`]: newReadLater,
          },
        })
      },
    },
  }
}

export default getState
