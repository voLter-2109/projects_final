import { useHttp } from "../hooks/http.hooks";

const MarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  // const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=4f23b9b23bbb5dd879a4772e4d4dce6d";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacterByName = async (name, disParam = false) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return _transformCharacter(res.data.results[0], disParam);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = (char, disParam) => {
    if (char) {
      return {
        id: char.id,
        name: char.name,
        description: disParam
          ? char.description
          : char.description
          ? `${char.description.slice(0, 150)}...`
          : "There is no description for this character",
        thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items,
      };
    } else {
      return null;
    }
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || "en-us",
      // optional chaining operator
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available",
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComics,
    getCharacterByName,
  };
};

export default MarvelService;
