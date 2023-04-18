import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import * as S from './style';

import { db } from '../../../firebase';
import IconHeartOn from '../../../assets/Icon-Heart-on.png';
import IconHeartOff from '../../../assets/Icon-Heart-off.png';
import IconStarOn from '../../../assets/Icon-star-on.png';
import IconStarOff from '../../../assets/Icon-star-off.png';
import useToggle from '../../../hooks/useToggle';

function PostCard({ id, date, like, location, menu, photo, review, score, shop, tags }) {
  const scoreIndexs = [0, 1, 2, 3, 4];
  const [liked, setLiked] = useToggle(like);
  const [formattedDate, setFormattedDate] = useState();

  const formatDate = (dateFormatted) => {
    const now = new Date();
    const nowYear = now.getFullYear();
    const dateString = dateFormatted.toISOString();
    const slicedDate = dateString.slice(5, 10).replace('-', '.');

    if (dateFormatted.getFullYear() === nowYear) {
      setFormattedDate(slicedDate);
    } else {
      const anotherYearDate = dateString.slice(2, 10).replaceAll('-', '.');

      setFormattedDate(anotherYearDate);
      console.log(formattedDate);
    }
  };

  useEffect(() => {
    const dateFormatted = date.toDate();

    console.log('년도', dateFormatted.getFullYear());
    formatDate(dateFormatted);
  }, []);

  const updatePost = async (postId, newLiked) => {
    const postDoc = doc(db, 'post', postId);
    const newField = { like: newLiked };

    await updateDoc(postDoc, newField);
  };

  const handleLikeButton = (postId) => {
    setLiked(!liked);
    updatePost(postId, !liked);
  };

  return (
    <S.PostCardBox>
      <S.PostCover>
        <span>{formattedDate}</span>
        {photo && <img src={photo} alt='메뉴 썸네일 사진' />}
      </S.PostCover>
      <S.PostContent>
        <S.PostInfo>
          <S.PostLike onClick={() => handleLikeButton(id)}>
            {liked ? (
              <img src={IconHeartOn} alt='좋아요 표시' />
            ) : (
              <img src={IconHeartOff} alt='좋아요 표시하지 않음' />
            )}
          </S.PostLike>
          <S.StarRatingContainer>
            {scoreIndexs.map((index) =>
              score > index ? (
                <img src={IconStarOn} alt='별점' key={index} />
              ) : (
                <img src={IconStarOff} alt='체크되지 않은 별점' aria-hidden='true' key={index} />
              ),
            )}
          </S.StarRatingContainer>
          <S.MenuInfo>{menu}</S.MenuInfo>
          <S.StoreInfo>
            {shop}&nbsp;{location}
          </S.StoreInfo>
        </S.PostInfo>
        <S.PostReview>
          {review && <p>{review}</p>}
          <S.TagContainer>
            {tags &&
              tags.map((tag) => (
                <S.Tag to='#' key={uuidv4()}>
                  #{tag}
                </S.Tag>
              ))}
          </S.TagContainer>
        </S.PostReview>
      </S.PostContent>
    </S.PostCardBox>
  );
}

export default PostCard;
