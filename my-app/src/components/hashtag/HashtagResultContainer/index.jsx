import React, { useState, useEffect } from 'react';
import { firestore } from '../../../firebase';
import HashtagResultView from '../HashtagResultView';

function HashtagResultContainer({ keyword }) {
  const [searchResult, setSearchResult] = useState([]);

  const searchInArray = async (collection, tag, value) => {
    const querySnapshot = await firestore
      .collection(collection)
      .where(tag, 'array-contains', value)
      .get();

    const results = [];

    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, data: doc.data() });
    });

    return results;
  };

  useEffect(() => {
    searchInArray('post', 'tag', keyword).then((results) => {
      const dataValues = results.map((doc) => doc.data);

      setSearchResult(dataValues);
    });
  }, [keyword]);

  console.log(searchResult);

  return <HashtagResultView postList={searchResult} />;
}

export default HashtagResultContainer;
