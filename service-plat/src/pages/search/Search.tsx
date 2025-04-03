import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchMinus } from "@fortawesome/free-solid-svg-icons";

// domain
import { Jobs } from "../../types/JobPost";

// components
import JobComponent from "../../components/JobCard";
import JobComponentSkeleton from "../../components/JobCardSkeleton";

// api
import { myApi } from "../../api/axios";
import { somejobs } from "../../api/data";

interface ApiResponse {
  items: Jobs[];
  next_cursor: string | null;
}

// Add the duplicate detection function here
const isDuplicateData = (newItems: Jobs[], existingItems: Jobs[]): boolean => {
  if (newItems.length === 0) return true;
  const existingIds = new Set(existingItems.map((item) => item.user_id));
  return newItems.some((item) => existingIds.has(item.user_id));
};

const SearchList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const isFetching = useRef(false);

  // Function to fetch jobs data with optional pagination support
  const fetchEnterprises = async (initialLoad = false) => {
    // Guard clause: prevent multiple simultaneous fetches or unnecessary fetches
    // when there's no more data (unless it's the initial load)
    if (isFetching.current || (!hasMore && !initialLoad)) return;

    // Set fetching flag to prevent concurrent calls
    isFetching.current = true;

    // Add artificial delay to prevent rapid successive requests
    // and improve UX by showing loading state
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Show loading indicator to user
    setLoading(true);

    try {
      // Extract and normalize search parameters from URL
      // toLowerCase() ensures case-insensitive search
      const city = searchParams.get("city")?.toLowerCase();
      const query = searchParams.get("query")?.toLowerCase();
      const sector = searchParams.get("sector")?.toLowerCase();
      const country = searchParams.get("country")?.toLowerCase();

      // Construct query parameters for API request
      // Use empty string as fallback when parameter is undefined
      const params: Record<string, string | number> = {
        limit: 20, // Number of items to fetch per request
        search: query || "",
        country: country || "",
        city: city || "",
        activity_sector: sector || "",
      };

      // Add cursor for pagination if it exists and not initial load
      // This allows fetching next page of results
      if (cursor && !initialLoad) {
        params.cursor = cursor;
      }

      // Make API request to fetch jobs with constructed parameters
      const response = await myApi().get<ApiResponse>(``, {
        params,
      });

      // Destructure response data to get items and next page cursor
      const { items, next_cursor } = response.data;

      // Log search parameters and response for debugging
      // console.log('Search params:', searchParams.toString());
      // console.log('Fetched data:', response.data);

      // Check for duplicate data if not initial load
      // Prevents adding same items multiple times during pagination
      if (!initialLoad && isDuplicateData(items, jobs)) {
        // console.log('Duplicate data detected, stopping pagination');
        setHasMore(false); // Disable further pagination
        setCursor(null); // Clear pagination cursor
        return; // Exit function early
      }

      // Update enterprises state
      // If initialLoad: replace all items
      // If pagination: append new items to existing list
      setJobs((prev) => (initialLoad ? items : [...prev, ...items]));

      // Handle pagination state updates
      if (!next_cursor) {
        // No more pages available
        setHasMore(false);
        setCursor(null);
      } else {
        // More pages available
        setCursor(next_cursor);
        setHasMore(true);
      }
    } catch (error) {
      // Handle any errors during fetch
      console.error("Error fetching enterprises:", error);
      // Disable pagination on error
      setHasMore(false);
      setCursor(null);
    } finally {
      // Clean up regardless of success or failure
      setLoading(false); // Hide loading indicator
      isFetching.current = false; // Reset fetching flag
    }
  };

  // Initial load and search filter updates
  useEffect(() => {
    const loadEnterprises = async () => {
      setJobs(somejobs || []); // Clear the current results
      setCursor(null); // Reset cursor
      setHasMore(true); // Allow further fetching
      //   await fetchEnterprises(true); // Fetch initial results
    };
    loadEnterprises();
    return () => {
      setHasMore(false);
      setCursor(null);
    };
  }, [searchParams]);

  return (
    <div className=" min-h-full w-full bg-gray-100">
      <div className="w-100 py-8 pt-4">
        <InfiniteScroll
          dataLength={jobs.length}
          next={() => fetchEnterprises()}
          hasMore={hasMore}
          loader={
            <div className="grid grid-cols-1 gap-3 px-6 pb-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({
                length: 4,
              }).map((_, index) => (
                <JobComponentSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          }
          endMessage={
            jobs.length > 0 && (
              <p className="py-4 text-center">
                <b>Vous avez vu toutes les entreprises</b>
              </p>
            )
          }
        >
          {loading && jobs.length === 0 ? (
            <div className="grid grid-cols-1 gap-3 px-6 pb-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <JobComponentSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 px-6 pb-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs.map((enterprise: Jobs, index: number) => (
                <JobComponent
                  key={index}
                  user_id={enterprise.user_id}
                  name={enterprise.name}
                  cover={enterprise.cover}
                  logo_url={enterprise.logo_url}
                  image_url={enterprise.image_url}
                  description={enterprise.description}
                  is_following={enterprise.is_following}
                  product_count={enterprise.product_count}
                  follower_count={enterprise.follower_count}
                  activity_sector={enterprise.activity_sector}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-12 text-center">
              <FontAwesomeIcon
                icon={faSearchMinus}
                className="text-6xl text-gray-400"
              />
              <h2 className="text-2xl font-bold text-gray-600">
                Aucun résultat trouvé
              </h2>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche ou vérifiez
                l'orthographe
              </p>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default SearchList;
