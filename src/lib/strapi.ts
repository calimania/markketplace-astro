interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

import { markketplace } from '../config';

/**
 * Wrapper method to abstract the creation of records in Markket Strapi API
 *
 * @param endpoint
 * @param data
 * @returns
 */
export const createRecord = async <T>(endpoint: string, data: T) => {
  try {
    const response = await fetch(`${markketplace.STRAPI_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    return response;
  } catch (error) {
    console.error('Record creation failed:', error);
    return false;
  }
};

/**
 * The following GETs a record by ID from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param id - The ID of the record to fetch
 * @returns The record fetched
 */
export const getRecordById = async (endpoint: string, id: string) => {
  try {
    const response = await fetch(`${markketplace.STRAPI_URL}/api/${endpoint}/${id}`);
    return response.json();
  }
  catch (error) {
    console.error('Record fetch failed:', error);
    return false;
  }
};

/**
 * The following GETs a record by slug from the Strapi API
 * @param endpoint
 * @param slug
 * @returns
 */
export const getRecordBySlug = async (endpoint: string, slug: string) => {
  try {
    const response = await fetch(`${markketplace.STRAPI_URL}/api/${endpoint}?filters[slug]=${slug}`);
    return response.json();
  } catch (error) {
    console.error('Record fetch failed:', error);
    return false;
  }
};

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${markketplace.STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  const res = await fetch(url.toString());
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}
