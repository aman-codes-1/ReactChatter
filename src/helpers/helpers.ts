import moment from 'moment';

export const formatDate = (dateValue: string | number | Date) => {
  const date = new Date(dateValue);
  return date
    .toLocaleString([], {
      dateStyle: 'short',
      timeStyle: 'short',
      hour12: true,
    })
    .replace(/,/g, '')
    .trim();
};

export const getCurrentYear = () => new Date().getFullYear();

export const getTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return time;
};

export const checkIfImageExists = (
  url: string,
  callback: (exists: boolean) => void,
) => {
  const img = new Image();
  img.src = url || 'undefined';

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };
    img.onerror = () => {
      callback(false);
    };
  }
};

export const chatHrefConstructor = (id1: string, id2: string) => {
  const sortedIds = [id1, id2].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
};

export const handleKeyPress = (event: KeyboardEvent, handler: any) => {
  if (event.key === 'Enter') {
    handler();
  }
};

export const checkScrollbar = (ref: any, setHasScrollbar: any) => {
  const listElement = ref?.current;
  if (listElement) {
    const { scrollHeight, clientHeight } = listElement;
    setHasScrollbar(scrollHeight > clientHeight);
  }
};

export const setFocus = (ref: any) => {
  const listElement = ref?.current;
  if (listElement) {
    listElement?.focus();
  }
};

export const updateHeight = (ref: any, setHeight: any) => {
  const listElement = ref?.current;
  if (listElement) {
    setHeight(listElement?.clientHeight);
  }
};

export const updateWidth = (ref: any, setHeight: any) => {
  const listElement = ref?.current;
  if (listElement) {
    setHeight(listElement?.clientWidth);
  }
};

export const scrollIntoView = (ref: any) => {
  const listElement = ref?.current;
  if (listElement) {
    listElement?.scrollIntoView?.({ block: 'end', inline: 'nearest' });
  }
};

export const scrollToSelected = (
  listItems: any[],
  ref: any,
  itemsRef: any,
  selectedListItem: any,
) => {
  const selectedItemIndex = listItems?.findIndex(
    (item) => item?._id === selectedListItem?._id,
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

const getDateLabel = (timestamp: number) => {
  const messageDate = moment(timestamp);
  let dateLabel: string;

  if (messageDate.isSame(moment(), 'day')) {
    dateLabel = 'Today';
  } else if (messageDate.isSame(moment().subtract(1, 'days'), 'day')) {
    dateLabel = 'Yesterday';
  } else if (messageDate.isAfter(moment().subtract(1, 'week'))) {
    dateLabel = messageDate.format('dddd');
  } else if (messageDate.isAfter(moment().subtract(6, 'months'))) {
    dateLabel = messageDate.format('ddd, D MMM');
  } else {
    dateLabel = messageDate.format('D MMM, YYYY');
  }

  return dateLabel;
};

export const groupMessages = (messages: any[] = [], _id: string) => {
  if (!messages?.length) return messages;

  const groupedByDay = messages.reduce((acc: any, message: any) => {
    const timestamp = message?.sender?.sentStatus?.timestamp;

    if (timestamp) {
      const dateLabel = getDateLabel(timestamp);

      if (!acc[dateLabel]) {
        acc[dateLabel] = [];
      }

      acc[dateLabel].push(message);
    }

    return acc;
  }, {});

  const flattenedMessages = Object.entries(groupedByDay).map(
    ([dateLabel, messages]: any) => ({
      dateLabel,
      groups: messages
        ?.reduce((acc: any, message: any) => {
          const lastGroup = acc && acc?.length ? acc?.[acc?.length - 1] : null;
          const isSameSender = lastGroup
            ? lastGroup?.[0]?.sender?._id === message?.sender?._id
            : false;
          if (isSameSender) {
            lastGroup.push(message);
          } else {
            acc.push([message]);
          }
          return acc;
        }, [])
        .map((msgGroups: any, idx: number) => ({
          side: msgGroups?.[0]?.sender?._id === _id ? 'right' : 'left',
          data: msgGroups,
          groupDetails:
            msgGroups?.[0]?.sender?._id === _id
              ? msgGroups?.[0]?.sender
              : msgGroups?.[idx]?.sender,
        })),
    }),
  );

  return flattenedMessages;
};

export const groupQueuedMessage = (prev: any[] = [], queuedMessage: any) => {
  if (!prev?.length || !queuedMessage) return prev;

  const prevCopy = [...prev];

  const queuedTimestamp = queuedMessage?.sender?.sentStatus?.timestamp;
  const queuedDateLabel = getDateLabel(queuedTimestamp);

  const groupIndex = prevCopy?.findIndex(
    (el) => el?.dateLabel === queuedDateLabel,
  );

  const newGroup = {
    side: 'right',
    data: [queuedMessage],
  };

  if (groupIndex < 0) {
    const newGroupData = {
      dateLabel: queuedDateLabel,
      groups: [newGroup],
    };

    prevCopy.push(newGroupData);
  } else {
    const group = prev[groupIndex];
    if (!group?.groups?.length) return prev;

    const groupsCopy = [...group.groups];
    const lastGroupIndex = groupsCopy?.length - 1;
    const lastGroup = groupsCopy[lastGroupIndex];

    if (lastGroup?.side === 'right') {
      groupsCopy[lastGroupIndex] = {
        ...lastGroup,
        data: [...lastGroup.data, queuedMessage],
      };
    } else {
      groupsCopy.push(newGroup);
    }

    const updatedGroup = { ...group, groups: groupsCopy };
    prevCopy[groupIndex] = updatedGroup;
  }

  return prevCopy;
};

export const groupNewMessageForOtherMember = (
  prev: any[] = [],
  queuedMessage: any,
) => {};

export const updateNewMessageInGroup = (
  prev: any[] = [],
  queueId: string,
  newMessage: any,
) => {
  if (!prev?.length) return prev;

  const updatedGroups = prev?.map((group: any) => {
    if (!group?.groups?.length) return group;

    const updatedSubGroups = group?.groups?.map((subGroup: any) => {
      if (!subGroup?.data?.length) return subGroup;

      const subGroupIndex = subGroup?.data?.findIndex(
        (item: any) => item?.id === queueId,
      );

      if (subGroupIndex < 0) return subGroup;

      const dataCopy = [...subGroup.data];
      dataCopy[subGroupIndex] = newMessage;

      return {
        ...subGroup,
        data: dataCopy,
      };
    });

    return {
      ...group,
      groups: updatedSubGroups,
    };
  });

  return updatedGroups;
};

export const mergeByDateLabel = (prevArray: any[], newArray: any[]) => {
  // const map = new Map();

  // newArray.forEach((item) => {
  //   map.set(item.dateLabel, structuredClone(item));
  // });

  // prevArray.forEach((item) => {
  //   if (map.has(item.dateLabel)) {
  //     const existingItem = map.get(item.dateLabel);
  //     existingItem.groups = [...existingItem.groups, ...item.groups];
  //   } else {
  //     map.set(item.dateLabel, structuredClone(item));
  //   }
  // });

  // return Array.from(map.values());

  const prevArrayFirstGroup = prevArray[0];
  const newArrayLastIndex = newArray?.length - 1;
  const newArrayLastGroup = newArray[newArrayLastIndex];

  if (
    prevArrayFirstGroup &&
    newArrayLastGroup &&
    prevArrayFirstGroup?.dateLabel === newArrayLastGroup?.dateLabel
  ) {
    const mergedFirstGroup = {
      ...prevArrayFirstGroup,
      groups: [...newArrayLastGroup.groups, ...prevArrayFirstGroup.groups],
    };

    return [
      ...newArray.slice(0, newArrayLastIndex),
      mergedFirstGroup,
      ...prevArray.slice(1),
    ];
  }

  return [...newArray, ...prevArray];
};

export const compareObjects = (first: any, second: any) => {
  if (first === second) return true;
  if (first === null || second === null) return false;
  if (typeof first !== 'object' || typeof second !== 'object') return false;
  const first_keys = Object.getOwnPropertyNames(first);
  const second_keys = Object.getOwnPropertyNames(second);
  if (first_keys.length !== second_keys.length) return false;
  for (const key of first_keys) {
    if (!Object.hasOwn(second, key)) return false;
    if (compareObjects(first[key], second[key]) === false) return false;
  }
  return true;
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
        !expectedTypeParams.some((typeParam) => typeParam === value)
      ) {
        return false;
      }
      return true;
    });
    return isValid;
  }
  return false;
};

export const debounce = (func: any, delay: number) => {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
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
  // Authentication
  AuthProfile: '/api/auth/profile',
  AuthLogout: '/api/auth/logout',
};
