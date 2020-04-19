import { renderHook } from '@testing-library/react-hooks';

import NewsFeedService from '../NewsFeedService';
import useNewsFeedData from '.';

NewsFeedService.queryNewsFeed = jest.fn();

describe('useNewsFeedData', () => {
  it('Should validate initial data', () => {
    const initialData = { 1: { hits: [] } };

    const { result } = renderHook(() => {
      return useNewsFeedData(1, initialData);
    });
    const {
      current: { curPageNewsFeedData },
    } = result;

    expect(curPageNewsFeedData).toMatchObject(initialData[1]);
  });

  it('Should load page data if not available', async () => {
    const mockData = { hits: [] };
    NewsFeedService.queryNewsFeed.mockImplementation(() =>
      Promise.resolve(mockData)
    );

    const { result, waitForNextUpdate } = renderHook(() => useNewsFeedData(1));
    expect(result.current.newsFeedDataLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.newsFeedDataLoading).toBe(false);
    expect(result.current.curPageNewsFeedData).toMatchObject(mockData);
    expect(result.current.newsFeedDataByPage).toMatchObject({
      1: { ...mockData },
    });
  });
});
