import { renderHook } from '@testing-library/react-hooks';
import UserService from '../UserService';

import useUserData from '.';
import { act } from 'react-test-renderer';

UserService.getUserData = jest.fn();
UserService.voteNewsFeed = jest.fn();
UserService.hideNewsFeed = jest.fn();

describe('useUserData', () => {
  it('Should validate initial data', () => {
    const initialData = { votedNewsFeedIds: [], hiddenNewsFeedIds: [] };

    const { result } = renderHook(() => {
      return useUserData(initialData);
    });
    const {
      current: { userData },
    } = result;

    expect(userData).toMatchObject(initialData);
  });

  it('Should load page data if not available', async () => {
    const mockData = {
      votedNewsFeedIds: ['1', '2'],
      hiddenNewsFeedIds: ['3', '4'],
    };
    UserService.getUserData.mockImplementation(() => Promise.resolve(mockData));

    const { result, waitForNextUpdate } = renderHook(() => useUserData());
    expect(result.current.userDataLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.userDataLoading).toBe(false);
    expect(result.current.userData).toMatchObject(mockData);
  });

  it('Should verify if voted id and hidden id updated on userData', async () => {
    const mockData = {
      votedNewsFeedIds: ['1', '2'],
      hiddenNewsFeedIds: [],
    };
    UserService.voteNewsFeed.mockImplementation(() =>
      Promise.resolve({ success: true })
    );
    UserService.hideNewsFeed.mockImplementation(() =>
      Promise.resolve({ success: true })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useUserData(mockData)
    );

    act(() => {
      result.current.voteNewsFeedOfId('123');
      result.current.hideNewsFeedOfId('345');
    });
    await waitForNextUpdate();

    expect(result.current.userData.votedNewsFeedIds).toContain('123');
    expect(result.current.userData.hiddenNewsFeedIds).toContain('345');
  });
});
