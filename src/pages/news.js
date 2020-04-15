import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  color: green;
`;

const News = (props) => <H1>This is news feed page {props.awesome}</H1>;

News.getServerSideProps = () => {
  return Promise.resolve({
    props: {
      awesome: 'whoa',
    },
  });
};

export default News;
