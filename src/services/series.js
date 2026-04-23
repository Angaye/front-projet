import { seriesApi } from "./api";

export const getPopularSeries = async () => {
  return await seriesApi.get("/series/popular");
};

export const searchSeries = async (query) => {
  return await seriesApi.get(
    `/series/search?q=${query}`
  );
};

export const getSeriesDetail = async (id) => {
  return await seriesApi.get(
    `/series/${id}`
  );
};