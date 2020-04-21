/* eslint-disable camelcase */
import { renderHook } from '@testing-library/react-hooks';

import NewsFeedService from '../NewsFeedService';
import useNewsFeedData from '.';

NewsFeedService.queryNewsFeed = jest.fn();

describe('useNewsFeedData', () => {
  it('Should validate initial data', () => {
    const initialData = { topstories_1: { hits: [] } };

    const { result } = renderHook(() => {
      return useNewsFeedData({
        pageNum: 1,
        storyType: 'topstories',
        initialNewsFeedData: initialData,
      });
    });
    const {
      current: { curPageNewsFeedData },
    } = result;

    expect(curPageNewsFeedData).toMatchObject(initialData['topstories_1']);
  });

  it('Should load page data if not available', async () => {
    const mockData = { hits: [] };
    NewsFeedService.queryNewsFeed.mockImplementation(() =>
      Promise.resolve(mockData)
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useNewsFeedData({
        pageNum: 1,
        storyType: 'topstories',
      })
    );
    expect(result.current.newsFeedDataLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.newsFeedDataLoading).toBe(false);
    expect(result.current.curPageNewsFeedData).toMatchObject(mockData);
    expect(result.current.newsFeedDataByPage).toMatchObject({
      topstories_1: { ...mockData },
    });
  });
});
