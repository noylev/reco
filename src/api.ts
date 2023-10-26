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
      pageSize: pageSize > 24 ? pageSize : 25,
    }),
  };

  let response;
  try {
    response = await fetch("/api/v1/app-service/get-apps", requestOptions);
  } catch (error) {
    console.log("There was an error", error);
  }
  return response?.json();
}
