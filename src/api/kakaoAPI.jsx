import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { MapMarker } from "react-kakao-maps-sdk";
// useKakaoLoader 훅을 사용하여 Kakao Maps SDK 로드
const useKakaoLoader = () => {
  const [kakaoLoaded, setKakaoLoaded] = useState(false);
  useEffect(() => {
    if (window.kakao) {
      console.log(window.kakao);
      setKakaoLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=44f25cb020400a3651519041b51ac8e8&libraries=services,clusterer&autoload=false";
    script.async = true;
    //SDK 로드하면 실행
    script.onload = () => {
      setKakaoLoaded(true);
      console.log("Kakao Maps SDK 로드 완료");
    };
    //SDK 로드 실패했을 때
    script.onerror = error => {
      console.error("Kakao Maps SDK 로드 실패", error);
    };
    document.head.appendChild(script);
  }, []);
  return kakaoLoaded;
};
export const KakaoMap = () => {
  const kakaoLoaded = useKakaoLoader();
  if (!kakaoLoaded) {
    return <div>Loading Kakao Map...</div>;
  }
  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100%", height: "360px" }}
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{ color: "#000" }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
};