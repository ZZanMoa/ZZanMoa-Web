import { Colors } from "@shared/constants";
import styled from "styled-components";
import Text from "../../Text";
import { useRecoilState } from "recoil";
import { storeMarkerState } from "@shared/atoms/storeMarkerState";
import { CurrentStore, mapCenterState } from "@shared/atoms/MapState";
import { ReviewButton } from "@shared/components/map/FindStore/StoreInfoWindow";

const FilteredStore = () => {
  const [storeMarkers] = useRecoilState(storeMarkerState);
  const [, setCurrentStore] = useRecoilState(CurrentStore);
  const [, setMapCenter] = useRecoilState(mapCenterState);

  const handleStoreClick = (
    storeId: string,
    latitude?: number,
    longitude?: number,
  ) => {
    if (latitude && longitude) setMapCenter({ lat: latitude, lng: longitude });
    setCurrentStore(storeId);
  };

  const handleShowReviewsClick = (storeId: string, storeName: string) => {
    const storeIdNum = parseInt(storeId, 10);
    const event = new CustomEvent("showReviews", {
      detail: { storeId: storeIdNum, storeName },
    });
    window.dispatchEvent(event);
  };

  return (
    <Container>
      {storeMarkers.map(
        ({
          storeId,
          storeName,
          address,
          items,
          phoneNumber,
          latitude,
          longitude,
        }) => {
          return (
            <StoreCard
              onClick={() => handleStoreClick(storeId, latitude, longitude)}
              key={storeId}
            >
              <Text
                variant="Body1"
                color={Colors.Black900}
                fontWeight="SemiBold"
              >
                {storeName}
              </Text>
              <StoreDetail>
                <Text
                  variant="Body4"
                  color={Colors.Black800}
                >{`장소 | ${address}`}</Text>
                <Text
                  variant="Body4"
                  color={Colors.Black800}
                >{`번호 | ${phoneNumber}`}</Text>
              </StoreDetail>
              <Footer>
                <StoreMenu>
                  {items.slice(0, 2).map(({ item, itemId, price }) => (
                    <Menu key={itemId + price}>
                      <Text
                        variant="Body4"
                        color={Colors.Emerald600}
                        fontWeight="SemiBold"
                      >
                        {item}
                      </Text>
                    </Menu>
                  ))}
                  {items.length - 2 > 0 && (
                    <Remains key={address + storeId}>
                      <Text
                        variant="Body4"
                        color={Colors.Black800}
                        fontWeight="SemiBold"
                      >
                        {`+${items.length - 2}`}
                      </Text>
                    </Remains>
                  )}
                </StoreMenu>

                <ReviewButton
                  onClick={() => handleShowReviewsClick(storeId, storeName)}
                >
                  <img
                    src="/images/aiReviewIcon.svg"
                    alt="리뷰 아이콘"
                    style={{ width: 16, height: 16 }}
                  />
                  <Text
                    variant="Body4"
                    color={Colors.Black900}
                    fontWeight="SemiBold"
                  >
                    AI 리뷰
                  </Text>
                </ReviewButton>
              </Footer>
            </StoreCard>
          );
        },
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const StoreCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${Colors.Black600};
  gap: 8px;
  padding: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.Black200};
  }
`;

const StoreDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const StoreMenu = styled.div`
  display: flex;
  gap: 10px;
`;

const Menu = styled.div`
  background-color: ${Colors.Emerald50};
  padding: 4px;
`;

const Remains = styled.div`
  background-color: ${Colors.Black100};
  padding: 4px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default FilteredStore;
