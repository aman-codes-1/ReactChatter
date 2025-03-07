import { RefObject } from 'react';
import moment from 'moment';
import 'moment/min/locales';
import { jwtDecode } from 'jwt-decode';
import { CACHED_MESSAGES_QUERY, MessageData, Receiver } from '../contexts';

moment.locale(navigator.language);

export const toggleDrawer = (
  setIsOpen: any,
  isSwitch?: boolean,
  value?: boolean,
) => {
  if (isSwitch) {
    setIsOpen((prev: boolean) => !prev);
  } else {
    setIsOpen(!!value);
  }
};

export const login = async (token: string, setAuth: any) => {
  const decoded = jwtDecode(token);
  if (Object.keys(decoded || {})?.length) {
    setAuth({
      isLoggedIn: true,
      ...decoded,
    });
  }
};

export const getMember = (members: any[], _id: string) => {
  let currentMember;
  let otherMember;

  if (members?.length) {
    for (const member of members) {
      if (member?._id) {
        if (member?._id === _id) {
          currentMember = member;
        } else if (member?._id !== _id) {
          otherMember = member;
        }
      }
    }
  }

  return { currentMember, otherMember };
};

export const getChatType = (chat: any) => {
  const isPrivateChat = chat?.type === 'private';
  const isGroupChat = chat?.type === 'group';
  const type = isPrivateChat || isGroupChat ? 'chat' : chat?.type;
  return { isPrivateChat, isGroupChat, type };
};

export const getChatDetails = (chat: any, otherMember: any, _id: string) => {
  const { isPrivateChat, isGroupChat, type } = getChatType(chat);
  let chatDetails: any;

  if (isGroupChat) {
    chatDetails = chat?.groupDetails;
  } else {
    chatDetails = otherMember;
  }

  return { isPrivateChat, isGroupChat, type, chatDetails };
};

export const clickChat = async (
  chat: any,
  chatDetails: any,
  setIsListItemClicked: any,
  setSelectedChat: any,
  setSelectedChatDetails: any,
  getChatMessagesWithQueue: any,
  navigate: any,
  prevPathname: string,
  fetchAll: any,
) => {
  setSelectedChat(chat);
  setSelectedChatDetails(chatDetails);
  let skipFinally = false;
  let route = '/';

  try {
    const id = chat?._id;
    const { type } = getChatType(chat);
    const userId = chatDetails?._id;
    if (type === 'chat') {
      await getChatMessagesWithQueue(id, type);
      route = `/chat?id=${id}&type=${type}`;
    }
    if (type === 'friend') {
      if (chat?.hasChats) {
        navigate('/');
        await fetchAll();
        skipFinally = true;
        return;
      }
      const fullFriendId = `${id}-${userId}`;
      await getChatMessagesWithQueue(fullFriendId, 'friend');
      route = `/chat?id=${fullFriendId}&type=${type}`;
    }
  } catch (err: any) {
    console.error('Error fetching messages:', err);
  } finally {
    if (!skipFinally) {
      if (prevPathname !== route) {
        navigate(route);
      }
      setIsListItemClicked((prev: boolean) => !prev);
    }
  }
};

export const getFriendId = (str: string | null) => {
  let friendId = '';
  let friendUserId = '';
  const isValid = str?.includes('-');
  if (isValid) {
    const ids = str?.split?.('-');
    friendId = ids?.[0] || '';
    friendUserId = ids?.[1] || '';
  }
  return { friendId, friendUserId };
};

export const setFocus = (ref: RefObject<HTMLInputElement>) => {
  const inputElement = ref?.current;
  if (inputElement) {
    setTimeout(() => {
      inputElement?.focus();
    }, 0);
  }
};

export const updateHeight = (ref: any, setHeight: any, delay = false) => {
  const listElement = ref?.current;
  if (listElement) {
    if (delay) {
      requestAnimationFrame(() => {
        setHeight(listElement?.clientHeight);
      });
    } else {
      setHeight(listElement?.clientHeight);
    }
  }
};

export const updateWidth = (ref: any, setWidth: any, delay = false) => {
  const listElement = ref?.current;
  if (listElement) {
    if (delay) {
      requestAnimationFrame(() => {
        setWidth(listElement?.clientWidth);
      });
    } else {
      setWidth(listElement?.clientWidth);
    }
  }
};

export const scrollTo = (
  ref: any,
  itemsRef: any,
  listItems: any[],
  id: string,
) => {
  const selectedItemIndex = listItems?.findIndex(
    (item) => item?._id && id && item?._id === id,
  );
  const listElement = ref?.current;
  const itemElement = itemsRef?.current?.[selectedItemIndex];
  if (selectedItemIndex !== -1 && listElement && itemElement) {
    const itemRect = itemElement?.getBoundingClientRect();
    const listRect = listElement?.getBoundingClientRect();
    const { scrollTop } = listElement || {};
    const topPos = itemRect.top - listRect.top + scrollTop;
    const itemHeight = itemRect.height;
    const listHeight = listRect.height;
    const scrollPos = topPos - listHeight / 2 + itemHeight / 2;
    listElement?.scrollTo({ top: scrollPos, behavior: 'smooth' });
  }
};

export const addRequest = (OnRequestAddedRequest: any, existingData: any) => {
  let data = existingData?.data;
  let totalCount = existingData?.totalCount;
  if (OnRequestAddedRequest && data?.length && totalCount) {
    data = addObject(OnRequestAddedRequest, data, true);
    totalCount = totalCount + 1;
  } else if (OnRequestAddedRequest) {
    data = [OnRequestAddedRequest];
    totalCount = 1;
  }
  return {
    data,
    totalCount,
  };
};

export const removeRequest = (
  OnRequestUpdatedRequestId: any,
  existingData: any,
) => {
  let data = existingData?.data;
  let totalCount = existingData?.totalCount;
  if (data?.length && totalCount) {
    data = removeObject(OnRequestUpdatedRequestId, data);
    totalCount = totalCount - 1;
  }
  return {
    data,
    totalCount,
  };
};

export const addObject = (
  dataToAdd: any,
  existingData: any,
  addToTop?: boolean,
) => {
  let data = existingData;
  if (dataToAdd && data?.length) {
    if (addToTop) {
      data = [dataToAdd, ...data];
    } else {
      data = [...data, dataToAdd];
    }
  } else if (dataToAdd) {
    data = [dataToAdd];
  }
  return data;
};

export const addArray = (arrToAdd: any, existingData: any) => {
  let data = existingData;
  if (arrToAdd?.length && data?.length) {
    data = [...data, ...arrToAdd];
  } else if (arrToAdd?.length) {
    data = [...arrToAdd];
  }
  return data;
};

export const removeObject = (id: string, existingData: any) => {
  let data = existingData;
  if (data?.length) {
    data = data?.filter((el: any) => el?._id && id && el?._id !== id);
  }
  return data;
};

export const findAndUpdate = (
  id: string,
  key: string,
  existingData: any,
  dataToUpdate: any,
  updateKey?: string,
) => {
  let isFoundAndUpdated = false;
  let data = existingData;
  let index = -1;
  if (data?.length) {
    index = data?.findIndex((el: any) => el?.[key] && id && el?.[key] === id);
    if (index >= 0) {
      const dataCopy = [...data];
      if (updateKey) {
        const updatedElement = {
          ...dataCopy[index],
          [updateKey]: dataToUpdate,
        };
        dataCopy[index] = updatedElement;
      } else {
        dataCopy[index] = dataToUpdate;
      }
      data = dataCopy;
      isFoundAndUpdated = true;
    }
  }
  return {
    isFoundAndUpdated,
    data,
    index,
  };
};

export const findAndMoveToTop = (
  id: string,
  key: string,
  existingData: any,
) => {
  let data = existingData;
  if (data?.length) {
    const index = data?.findIndex(
      (el: any) => el?.[key] && id && el?.[key] === id,
    );
    if (index >= 0) {
      const dataCopy = [...data];
      const [foundElement] = dataCopy.splice(index, 1);
      dataCopy.unshift(foundElement);
      data = dataCopy;
    }
    return data;
  }
};

export const getLastMessage = (edges: any[]) => {
  const lastEdgeIndex = edges?.length - 1;
  const lastMessage = edges?.[lastEdgeIndex] || null;
  return lastMessage;
};

export const getSender = (members: any[], timestamp: number, _id: string) => {
  if (members?.length) {
    const sender = members?.find(
      (member: any) => member?._id && member?._id === _id,
    );
    if (sender) {
      const { hasAdded, ...rest } = sender || {};
      return {
        ...rest,
        queuedStatus: {
          isQueued: true,
          timestamp,
        },
        sentStatus: null,
        retryStatus: null,
      };
    }
    return {};
  }
  return {};
};

export const getReceivers = (members: any[], _id: string) => {
  if (members?.length) {
    const updatedMembers = removeObject(_id, members);
    const receivers = updatedMembers?.map((member: any) => {
      const { hasAdded, ...rest } = member || {};
      return {
        ...rest,
        deliveredStatus: null,
        readStatus: null,
      };
    });
    return receivers;
  }
  return [];
};

export const renderMessage = async (
  cachedMessagesClient: any,
  queuedMessage: any,
  id: string,
  setScrollToBottom?: any,
) => {
  let edges: any[] = [];
  let pageInfo = {
    endCursor: '',
    hasPreviousPage: false,
    hasNextPage: false,
  };
  let scrollPosition = 0;
  let isFetched = false;
  let isRendered = false;

  const cachedMessagesQuery = await cachedMessagesClient.readQuery({
    query: CACHED_MESSAGES_QUERY,
    variables: { chatId: id },
  });

  if (cachedMessagesQuery) {
    const cachedData = cachedMessagesQuery?.cachedMessages;
    edges = addObject(queuedMessage, cachedData?.edges) || [];
    pageInfo = cachedData?.pageInfo?.endCursor
      ? cachedData?.pageInfo
      : pageInfo;
    scrollPosition = cachedData?.scrollPosition;
    isFetched = cachedData?.isFetched;
  } else {
    edges = [queuedMessage];
  }

  cachedMessagesClient.writeQuery({
    query: CACHED_MESSAGES_QUERY,
    data: {
      cachedMessages: {
        edges,
        pageInfo,
        scrollPosition,
        isFetched,
      },
    },
    variables: { chatId: id },
  });

  setScrollToBottom?.((prev: boolean) => !prev);

  isRendered = true;

  return { isRendered };
};

export const addUpdateChat = (
  chatsClient: any,
  _id: string,
  id: string,
  key: string,
  dataToUpdate: any,
  updateKey?: string,
  isMoveToTop?: boolean,
) => {
  let isChatAdded = false;
  let isChatUpdated = false;

  chatsClient.cache.modify({
    fields: {
      [`chats({"input":{"userId":"${_id}"}})`](existingData: any) {
        const { isFoundAndUpdated, data } = findAndUpdate(
          id,
          key,
          existingData,
          dataToUpdate,
          updateKey,
        );
        if (isFoundAndUpdated && data?.length) {
          isChatUpdated = true;
          if (isMoveToTop) {
            const updatedData = findAndMoveToTop(id, key, data);
            return updatedData;
          }
          return data;
        }
        if (!isFoundAndUpdated) {
          const newData = addObject(dataToUpdate, existingData, true);
          isChatAdded = true;
          return newData;
        }
        return existingData;
      },
    },
  });

  return {
    isChatAdded,
    isChatUpdated,
  };
};

export const deleteFriend = (friendsClient: any, _id: string, id: string) => {
  friendsClient.cache.modify({
    fields: {
      [`friends({"input":{"userId":"${_id}"}})`](existingData: any) {
        const data = removeObject(id, existingData);
        return data;
      },
    },
  });
};

export const deleteFriendsCachedMessages = (
  cachedMessagesClient: any,
  id: string,
) => {
  cachedMessagesClient.cache.evict({
    fieldName: 'cachedMessages',
    args: { input: { chatId: id } },
  });
  cachedMessagesClient.cache.gc();
};

export const checkIsMemberExists = (
  members: any[],
  key: string,
  _id: string,
) => {
  let isCurrentMember = false;
  let isOtherMember = false;

  for (const member of members) {
    if (member?._id && member?._id === _id) {
      if (member[key]) {
        isCurrentMember = true;
      } else if (member[key] === false) {
        isOtherMember = true;
      }
    }
    if (isCurrentMember && isOtherMember) break;
  }

  return { isCurrentMember, isOtherMember };
};

export const checkMessageStatus = (msg: MessageData, chat: any) => {
  let isDelivered: boolean | undefined;
  let isRead: boolean | undefined;
  let deliveredTimestamp: number | undefined;
  let readTimestamp: number | undefined;

  const sender = msg?.sender;
  const queuedStatus = sender?.queuedStatus;
  const isQueued = queuedStatus?.isQueued;
  const sentStatus = sender?.sentStatus;
  const isSent = sentStatus?.isSent;
  const retryStatus = sender?.retryStatus;
  const isRetry = retryStatus?.isRetry;
  const { isPrivateChat } = getChatType(chat);

  if (isPrivateChat) {
    const receiver = msg?.receivers?.[0];
    const deliveredStatus = receiver?.deliveredStatus;
    isDelivered = deliveredStatus?.isDelivered;
    deliveredTimestamp = deliveredStatus?.timestamp;
    const readStatus = receiver?.readStatus;
    isRead = readStatus?.isRead;
    readTimestamp = readStatus?.timestamp;
  }

  if (chat?.type === 'group') {
    isDelivered = msg?.receivers?.every(
      (el: Receiver) => el?.deliveredStatus?.isDelivered,
    );
    isRead = msg?.receivers?.every((el: Receiver) => el?.readStatus?.isRead);
  }

  return {
    isQueued,
    isSent,
    isRetry,
    isDelivered,
    isRead,
    deliveredTimestamp,
    readTimestamp,
  };
};

export const uniqueQueuedMessages = (edges: any[], queuedMessages: any[]) => {
  return queuedMessages?.filter((queuedMessage: any) => {
    return !edges?.some(
      (msg: any) =>
        msg?.queueId &&
        queuedMessage?.queueId &&
        msg?.queueId === queuedMessage?.queueId,
    );
  });
};

export const validateSearchParams = (search: string) => {
  if (search) {
    const searchParams = new URLSearchParams(search);
    const expectedParams = ['id', 'type'];
    const isValid = expectedParams.every((param) => {
      const value = searchParams.get(param);
      if (!value || value.trim() === '') {
        return false;
      }
      const expectedTypeParams = ['chat', 'friend'];
      if (
        param === 'type' &&
        !expectedTypeParams.some(
          (typeParam) => typeParam && value && typeParam === value,
        )
      ) {
        return false;
      }
      return true;
    });
    return isValid;
  }
  return false;
};

export const sortByLastMessageTimestamp = (data: any[]) => {
  const sortedData = [...data].sort((a, b) => {
    const timestampA = a?.lastMessage?.timestamp || a?.createdAt || 0;
    const timestampB = b?.lastMessage?.timestamp || b?.createdAt || 0;
    return timestampB - timestampA;
  });
  return sortedData;
};

export const sortByTimestamp = (data: any[]) => {
  const sortedData = [...data].sort((a, b) => {
    const timestampA = a?.timestamp || 0;
    const timestampB = b?.timestamp || 0;
    return timestampA - timestampB;
  });
  return sortedData;
};

export const calculateSide = (message: any, _id: string) =>
  message?.sender?._id && message?.sender?._id === _id ? 'right' : 'left';

export const getOnlineStatus = (isOnline: boolean) => {
  return {
    isOnline,
    lastSeen: Date.now(),
  };
};

export const getDate = (
  timestamp: number,
  dateTimeFormatOptions: Intl.DateTimeFormatOptions,
) => {
  const date = new Date(timestamp);
  const browserLocale = navigator.language || 'en-US';
  const dateLabel = date.toLocaleDateString(
    browserLocale,
    dateTimeFormatOptions,
  );

  return dateLabel;
};

export const getDateLabel = (timestamp: number) => {
  let dateLabel: string;
  const time = moment(timestamp);

  if (time.isSame(moment(), 'day')) {
    dateLabel = 'Today';
  } else if (time.isSame(moment().subtract(1, 'days'), 'day')) {
    dateLabel = 'Yesterday';
  } else if (time.isAfter(moment().subtract(6, 'days'))) {
    dateLabel = time.format('dddd');
  } else if (time.isAfter(moment().subtract(6, 'months'))) {
    dateLabel = time.format('ddd, D MMM');
  } else {
    dateLabel = time.format('D MMM YYYY');
  }

  return dateLabel;
};

export const getDateLabel2 = (
  timestamp: number,
  disableWeekDays: boolean = false,
  dateTimeFormatOptions: Intl.DateTimeFormatOptions,
) => {
  let dateLabel: string;
  const time = moment(timestamp);

  if (time.isSame(moment(), 'day')) {
    dateLabel = 'today';
  } else if (time.isSame(moment().subtract(1, 'days'), 'day')) {
    dateLabel = 'yesterday';
  } else if (time.isAfter(moment().subtract(1, 'week')) && !disableWeekDays) {
    dateLabel = time.format('ddd');
  } else {
    dateLabel = getDate(timestamp, dateTimeFormatOptions);
  }

  return dateLabel;
};

export const getDateFromNow = (timestamp: number) => {
  let dateLabel: string;
  const time = moment(timestamp);

  moment.updateLocale('en', {
    relativeTime: {
      h: '1 hour',
      dd: (number) => {
        if (number < 7) return `${number} days`;
        const weeks = Math.floor(number / 7);
        return weeks === 1 ? '1 week' : `${weeks} weeks`;
      },
      M: '1 month',
      y: '1 year',
    },
  });

  if (time.isAfter(moment().subtract(13, 'hours'))) {
    dateLabel = time.fromNow();
  } else if (time.isSame(moment().subtract(1, 'day'), 'day')) {
    dateLabel = 'Yesterday';
  } else {
    dateLabel = time.fromNow();
  }

  return dateLabel;
};

export const getTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const browserLocale = navigator.language || 'en-US';
  const time = date
    .toLocaleTimeString(browserLocale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .toUpperCase();
  return time;
};

export const getCurrentYear = () => new Date().getFullYear();

export const getBadgeWidth = (navLinkCount: number = 0) => {
  const navLinkLength = String(navLinkCount)?.length;
  let val = 0;
  if (navLinkLength === 1) {
    val = 10;
  } else if (navLinkLength === 2) {
    val = 7;
  } else if (navLinkLength === 3) {
    val = 6;
  } else {
    val = 5.5;
  }
  return navLinkLength * val;
};

export const compareObjects = (first: any, second: any) => {
  if (first && second && first === second) return true;
  if (first === null || second === null) return false;
  if (typeof first !== 'object' || typeof second !== 'object') return false;
  const first_keys = Object.getOwnPropertyNames(first);
  const second_keys = Object.getOwnPropertyNames(second);
  if (first_keys?.length !== second_keys?.length) return false;
  for (const key of first_keys) {
    if (!Object.hasOwn(second, key)) return false;
    if (compareObjects(first[key], second[key]) === false) return false;
  }
  return true;
};

export const deleteKeyValuePairs = (obj: any, keysToDelete: any[]) => {
  const newObj = { ...obj };
  if (keysToDelete?.length) {
    keysToDelete?.forEach((key) => {
      if (key in newObj) {
        delete newObj[key];
      }
    });
  }
  return newObj;
};

export const checkKeys = (uniqueKeys: any[], item: any) => {
  let value = '';
  if (uniqueKeys?.length) {
    for (const key of uniqueKeys) {
      if (item?.[key]) {
        value = item[key];
        break;
      }
    }
  }
  return value;
};

export const checkIfNumber = (val: any) => (val ? !Number.isNaN(val) : false);

export const debounce = (func: any, delay: number) => {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const handleKeyPress = (event: KeyboardEvent, handler: any) => {
  if (event.key === 'Enter') {
    handler();
  }
};

const getTextEncoding = (text: string) => {
  const enc = new TextEncoder();
  return enc.encode(text);
};

const getCryptoKey = async (key: string) => {
  const encodedKey = new TextEncoder().encode(key);
  const res = await crypto.subtle.importKey(
    'raw',
    encodedKey,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt'],
  );
  return res;
};

const decodeBase64ToUint8Array = (data: string) => {
  try {
    if (!data || typeof data !== 'string') {
      throw new Error('Invalid Base64 input');
    }
    const binaryString = atob(data);
    return new Uint8Array(
      Array.from(binaryString).map((char) => char.charCodeAt(0)),
    );
  } catch (err) {
    console.error('Failed to decode Base64 string:', err);
    throw err;
  }
};

export const encrypt = async (data: string, secretKey: string) => {
  const encoded = getTextEncoding(data);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getCryptoKey(secretKey);
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded,
  );
  const combined = new Uint8Array(iv.length + encryptedData.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encryptedData), iv.length);
  const res = btoa(String.fromCharCode(...combined));
  return res;
};

export const decrypt = async (data: string, secretKey: string) => {
  const combined = decodeBase64ToUint8Array(data);
  const iv = combined.slice(0, 12);
  const encryptedData = combined.slice(12);
  const key = await getCryptoKey(secretKey);
  const decryptedData = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encryptedData,
  );
  const res = new TextDecoder().decode(decryptedData);
  return res;
};

export const regex = {
  validateEmail:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  validatePassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  validateURL:
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  validatePhone:
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
  checkNumber: /^[0-9]+$/,
  checkNumberLengthTen: /^[0-9]{10}$/,
  validatePortNumber:
    /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
  validateExtension: /^(\d{4})/,
  positiveNumbersOnly: /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/,
  alphaNumeric: /^[A-Za-z0-9 ]+$/,
  upperCaseLetters: /^[A-Z]{2}$/,
  validateName: /^[^0-9]+[A-Za-z0-9 &,;/()\\#^\\['.-]*$/,
  validateAlphabets: /^[A-Za-z ]+$/,
};

export const apiRoutes = {
  AuthLogout: '/api/auth/logout',
};
