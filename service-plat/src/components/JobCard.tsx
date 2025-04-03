import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import { Jobs } from "../types/JobPost";
import { myApi } from "../api/axios";
import header_img from "../assets/1.jpg";

const JobComponent: React.FC<Jobs> = (props) => {
  const [slide, setSlide] = useState(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(
    props.is_following || false
  ); // Follow state
  const [loading, setLoading] = useState(false); // Loading state for follow/unfollow
  const [followerCount, setFollowerCount] = useState<number>(
    props.follower_count || 0
  ); // Local follower count
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
  });

  // Scroll Previous Slide
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setSlide(true);
    }
  }, [emblaApi]);

  // Scroll Next Slide
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setSlide(false);
    }
  }, [emblaApi]);

  // Card click to toggle slide
  const handleCardClick = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.closest(".no-slide")) return; // Prevent slide toggle
    if (emblaApi) {
      if (slide) {
        scrollNext();
      } else {
        scrollPrev();
      }
    }
  };

  // Follow or Unfollow Organization
  const handleFollowToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent slide toggle
    setLoading(true);
    try {
      const url = `/organizations/${props.user_id}/${
        isFollowing ? "unfollow" : "follow"
      }`;
      const response = await myApi()[isFollowing ? "delete" : "post"](url);
      console.log("response follow", response.data || response);

      if (response.status === 200) {
        // Fetch updated follower count to be done soon after API update
        // const response = await myGuideApi().get(
        //   `/organizations/${props.user_id}/followers`
        // );
        // console.log('response followers', response.data || response);
        // setFollowerCount(response.data.follower_count);

        // Update local state instantly
        setIsFollowing(!isFollowing);
        setFollowerCount((prevCount) =>
          isFollowing ? prevCount - 1 : prevCount + 1
        );

        if (!isFollowing) {
          // Redirect after follow
          const redirectUrl =
            import.meta.env.VITE_REDIRECT_AFTER_FOLLOW_URL + props.user_id;
          if (redirectUrl) {
            // window.location.href = redirectUrl;
            // window.open(redirectUrl, '_blank');
            window.open(redirectUrl);

            return; // Stop further execution
          }
        }
      }
    } catch (error) {
      console.error("Error following/unfollowing:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => setSlide((prevSlide) => !prevSlide);
      emblaApi.on("select", onSelect);
      return () => {
        emblaApi.off("select", onSelect);
      };
    }
    return undefined; // Explicitly return undefined if emblaApi is not present
  }, [emblaApi]);

  return (
    <div
      className="min-h-20 max-w-sm cursor-pointer rounded-lg border border-gray-200 bg-white text-center shadow"
      onClick={handleCardClick}
    >
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {/* Slide 1 */}
            <div className="embla__slide">
              <img
                className="h-36 w-full rounded-t-lg object-cover"
                src={header_img}
                alt="img"
              />
              <div className="px-4 py-5">
                <img
                  className="-mt-16 mb-2 inline-block w-1/3 rounded-lg border-4 border-white"
                  src={header_img}
                  alt="Logo d'entreprise"
                />
                <h5 className="mb-1 overflow-hidden text-lg font-bold capitalize text-gray-800">
                  {props.name}
                </h5>
                <div
                  className={`grid ${
                    props.product_count > 0
                      ? "grid-cols-2 gap-2"
                      : "grid-cols-1"
                  }`}
                >
                  {props.product_count > 0 && (
                    <div className="text-center">
                      {"Testing Pokam"} <br />
                      <span className="font-bold">{props.product_count}</span>
                    </div>
                  )}
                  <div className="text-center">
                    Abonnés <br />
                    <span className="font-bold">{followerCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="embla__slide">
              <div className="w-full p-3 text-center font-semibold capitalize">
                {props.activity_sector}
              </div>
              <hr
                style={{
                  borderTop: "1px #f97316 solid",
                }}
              />
              <div className="text-right">
                <h1 className="m-3 text-center text-sm text-gray-800">
                  Présentation de <strong>{props.name}</strong>
                </h1>
                <p className="mb-5 max-h-44 min-h-fit overflow-hidden text-ellipsis px-3 text-justify text-sm">
                  {props.description?.slice(0, 250) || "Aucune description"}
                </p>
                {/* Follow/Unfollow Button */}
                <button
                  className={`btnk no-slide my-2 mr-5 inline-flex items-center gap-1 rounded-full px-2 py-1 text-right text-sm font-medium ${
                    isFollowing ? "text-red-500" : "text-green-500"
                  }`}
                  onClick={handleFollowToggle}
                  disabled={loading}
                >
                  {loading
                    ? "..."
                    : isFollowing
                    ? "Se désabonner"
                    : "S'abonner"}
                </button>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="inset-x-0 bottom-0 my-3 flex justify-center">
            <div
              className="embla__prev mx-1 cursor-pointer bg-transparent"
              onClick={scrollPrev}
            >
              <i
                className={`block h-2 w-2 rounded-full ${
                  slide ? "bg-orange-400" : ""
                }`}
              ></i>
            </div>
            <div
              className="embla__next mx-1 cursor-pointer bg-transparent"
              onClick={scrollNext}
            >
              <i
                className={`block h-2 w-2 rounded-full ${
                  !slide ? "bg-orange-400" : ""
                }`}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobComponent;
