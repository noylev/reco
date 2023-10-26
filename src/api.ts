import { AppDetails } from "./app-details";

export async function getData(
  pageNumber: number,
  pageSize: number,
): Promise<{
  appRows: AppDetails[];
  totalCount: number;
}> {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pageNumber,
      pageSize,
    }),
  };

  let response;
  try {
    response = await fetch(
      `/api/v1/app-service/get-apps?page=${pageNumber}`,
      requestOptions,
    ).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
  return response;
}
