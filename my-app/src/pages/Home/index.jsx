import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';
import { UserIdState } from '../../atom/authRecoil';
import { appAuth } from '../../firebase';
import * as S from './style';
import Header from '../../components/common/Header';
import NavBar from '../../components/common/NavBar';
import DrinkIcon from '../../assets/Icon-beverage.png';
import DessertIcon from '../../assets/Icon-dessert.png';
import CategoryCard from '../../components/home/CategoryCard';
import RecentPosts from '../../components/home/RecentPosts';
import usePost from '../../hooks/usePost';

function Home() {
  const userId = useRecoilValue(UserIdState);
  const [userName, setUserName] = useState('');
  const { isLoading, isError, data } = usePost(userId, 'ALL');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, (user) => {
      setUserName(user.displayName);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return <div>🌀 Loading 🌀 </div>;
  }

  if (isError) {
    return <div>fetch data중 에러</div>;
  }

  const postCount = data.length;
  const drinkCount = data.filter((v) => v.theme === '음료').length;
  const dessertCount = data.filter((v) => v.theme === '디저트').length;

  const cards = [
    {
      categoryId: 'drink',
      title: '음료',
      icon: DrinkIcon,
      count: drinkCount,
    },
    {
      categoryId: 'dessert',
      title: '디저트',
      icon: DessertIcon,
      count: dessertCount,
    },
  ];

  return (
    <>
      <Header
        isHome
        rightChild={
          <>
            <S.HashLink to='/hashtag' />
            <S.SearchLink to='/search' />
          </>
        }
      />
      <S.Container>
        <section>
          <S.SectionContainer>
            <S.Title>오늘도 나만의 커디어리를 기록해 보세요!</S.Title>
            <S.Total>
              <S.TotalTxt>전체 기록</S.TotalTxt>
              <S.Count>{postCount}</S.Count>
            </S.Total>
          </S.SectionContainer>
        </section>
        <section>
          <S.SubTitle>{userName}님의 기록 앨범</S.SubTitle>
          <S.CategoryCards>
            {cards.map((card) => (
              <CategoryCard
                key={card.categoryId}
                title={card.title}
                Icon={card.icon}
                count={card.count}
              />
            ))}
          </S.CategoryCards>
        </section>
        <section>
          <RecentPosts userId={userId} />
        </section>
      </S.Container>
      <NavBar />
    </>
  );
}

export default Home;
