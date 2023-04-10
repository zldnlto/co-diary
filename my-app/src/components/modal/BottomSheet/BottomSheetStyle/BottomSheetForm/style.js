import styled from 'styled-components';
import Theme from '../../../../../styles/Theme';
import MyLocationIcon from '../../../../../assets/Icon-MyLocation.png';

export const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 3.6rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: ${Theme.WHITE};
  padding: 1.2rem 2rem;
  border-bottom: 1px solid #bdbdbd;
`;

export const BottomSheetTitle = styled.h2`
  font-size: 1.8rem;
  padding-top: 0.4rem;
`;

export const CloseButton = styled.button`
  background-color: ${Theme.WHITE};
  width: 2.4rem;
  height: 2.4rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Main = styled.div`
  height: 83vh;
  padding-top: 1.6rem;

  font-size: 1.4rem;
`;

export const SearchFormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 5.6rem;
  grid-template-rows: 3.2rem;
  gap: 1rem;
  padding: 0 2rem;
`;

export const MyLocation = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  height: 6rem;
  width: 100%;
  margin-top: 1rem;
  padding: 2rem 2rem 2rem 4rem;
  font-size: 1.4rem;
  text-align: left;

  &:hover,
  &:active {
    color: ${Theme.MAIN_GRAY};
  }

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    left: 2rem;
    background-image: url(${MyLocationIcon});
    background-size: cover;
    width: 1.4rem;
    height: 1.4rem;
  }
`;

export const SectionBorder = styled.div`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  border-bottom: 6px solid ${Theme.SECTION_BG};
`;

export const ResultSection = styled.div`
  padding-top: 2rem;
`;

export const SectionTitle = styled.div`
  font-family: 'LINESeedKR-Bd';
  padding-left: 2rem;
`;

export const Results = styled.ul`
  display: flex;
  flex-direction: column;

  margin-top: 1rem;

  max-height: calc(83vh - 9.6rem);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Result = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1.2rem 2rem;
  border-bottom: 1px solid #dbdbdb;

  line-height: 1.8rem;
  cursor: pointer;

  transition: 0.2s ease-out all;

  &:hover {
    border-bottom: 1px solid ${Theme.MAIN_GRAY};
  }
`;

export const ResultTitle = styled.span``;

export const ResultDetail = styled.span`
  font-size: 1.2rem;
  color: #767676;
`;
