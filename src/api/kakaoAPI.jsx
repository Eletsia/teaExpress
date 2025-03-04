import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const useKakaoLoader = () => {
  const [kakaoLoaded, setKakaoLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao) {
      setKakaoLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=44f25cb020400a3651519041b51ac8e8&libraries=services&autoload=false";
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => setKakaoLoaded(true));
    };
    script.onerror = () => console.error("Kakao Maps SDK 로드 실패");

    document.head.appendChild(script);
  }, []);

  return kakaoLoaded;
};

export const KakaoMap = ({ posts, onAddressChange }) => {
  const kakaoLoaded = useKakaoLoader();
  const [position, setPosition] = useState({
    lat: 33.5563,
    lng: 126.79581,
  });
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!kakaoLoaded || !window.kakao) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(position.lng, position.lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const newAddress =
          result[0]?.road_address?.address_name ||
          result[0]?.address?.address_name ||
          "주소 정보를 찾을 수 없음";
        setAddress(newAddress);
        if (onAddressChange) {
          onAddressChange(newAddress);
        }
      }
    });
  }, [position, kakaoLoaded, onAddressChange]);

  if (!kakaoLoaded) {
    return <div>Loading Kakao Map...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <Map
        center={position}
        className="h-[300px] w-[500px] max-sm:w-full"
        level={3}
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          setPosition({ lat: latlng.getLat(), lng: latlng.getLng() });
        }}
        onDragEnd={map => {
          const center = map.getCenter();
          setPosition({ lat: center.getLat(), lng: center.getLng() });
        }}
      >
        {posts
          .filter(post => post.lat && post.lng)
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
        <MapMarker position={position}>
          <div style={{ color: "#000" }}>{address}</div>
        </MapMarker>
      </Map>
      <div className="flex flex-col gap-2">
        <p>지도를 클릭하거나 이동하여 주소를 확인하세요.</p>
        <div>현재 위치 주소: {address}</div>
      </div>
    </div>
  );
};
