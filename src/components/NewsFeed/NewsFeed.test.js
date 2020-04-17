import React from 'react';
import renderer from 'react-test-renderer';

import NewsFeed from '.';

const newsFeedData = {
  totalComments: 0,
  totalUpVotes: 0,
  title: '',
  linkDomain: '',
  username: '',
  postedWhen: '',
  url: '',
};

describe('NewsFeed', () => {
  it('Should render component with default props', () => {
    const tree = renderer.create(<NewsFeed data={newsFeedData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render component voted enabled', () => {
    const tree = renderer
      .create(<NewsFeed data={newsFeedData} voted />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
