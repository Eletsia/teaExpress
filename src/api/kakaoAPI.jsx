import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { MapMarker } from "react-kakao-maps-sdk";

// useKakaoLoader 훅을 사용하여 Kakao Maps SDK 로드
const useKakaoLoader = () => {
  const [kakaoLoaded, setKakaoLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao) {
      setKakaoLoaded(true);
      return;
    }

    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=44f25cb020400a3651519041b51ac8e8&libraries=services,clusterer&autoload=false";
    script.async = true;

    // SDK 로드 성공했을 때
    script.onload = () => {
      setKakaoLoaded(true);
      console.log("Kakao Maps SDK 로드 완료");
    };

    // SDK 로드 실패했을 때
    script.onerror = error => {
      console.error("Kakao Maps SDK 로드 실패", error);
    };

    document.head.appendChild(script);
  }, []);

  return kakaoLoaded;
};

export const KakaoMap = ({ posts }) => {
  const kakaoLoaded = useKakaoLoader();
  const [position, setPosition] = useState({ lat: 33.5563, lng: 126.79581 });

  if (!kakaoLoaded) {
    return <div>Loading Kakao Map...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 카카오 지도 */}
      <Map
        center={position}
        className="h-[300px] w-[500px] max-sm:w-full"
        level={9}
      >
        {posts
          .filter(post => post.lat && post.lng) // lat, lng이 null이 아닌 데이터만 필터링
          .map(post => (
            <MapMarker
              key={post.post_id}
              position={{
                lat: parseFloat(post.lat),
                lng: parseFloat(post.lng),
              }}
            >
              <div style={{ color: "#000" }}>{post.title}</div>
            </MapMarker>
          ))}
      </Map>

      {/* 설명 */}
      <div className="flex flex-col gap-2">
        <p>지도를 클릭해주세요!</p>

        <div id="clickLatlng">
          {position && `위치 : 위도 "${position.lat}" / 경도 "${position.lng}"`}
        </div>
      </div>
    </div>
  );
};
