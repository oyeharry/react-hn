import fetch from 'cross-fetch';

jest.mock('cross-fetch', () => jest.fn());

import newsFeedMockResponse from './NewsFeedResponseMock';
import NewsFeedService from './NewsFeedService';

const mockedResponse = Promise.resolve({
  ok: true,
  json: () => {
    return {
      ...newsFeedMockResponse,
    };
  },
});

describe('NewsFeedService', () => {
  it('Should get valid response of news feed', async () => {
    fetch.mockImplementation(() => mockedResponse);
    const response = await NewsFeedService.queryNewsFeed({ pageNum: 1 });
    expect(response).toMatchSnapshot();
  });
});
