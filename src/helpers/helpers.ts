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

export const scrollIntoView = (ref: any) => {
  const listElement = ref?.current;
  if (listElement) {
    listElement?.scrollIntoView({ block: 'end', inline: 'nearest' });
  }
};

export const scrollToSelected = (
  listItems: any[],
  ref: any,
  itemsRef: any,
  selectedListItem: any,
) => {
  const selectedItemIndex = listItems?.indexOf(selectedListItem);
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

export const checkWrapping = (refs: any, index: number) => {
  const listElement = refs?.current?.[index];
  if (listElement) {
    const { clientHeight, children, firstChild } = listElement || {};
    const items: any = Array.from(children);
    if (items?.length > 1) {
      const firstItemTop = items[0].getBoundingClientRect().top;
      const lastItemTop = items[items.length - 1].getBoundingClientRect().top;

      const wrapped = items.some((item: any, index: number) => {
        if (index === 0) return false; // Skip the first item
        return item.getBoundingClientRect().top !== firstItemTop;
      });

      return {
        isColumn: wrapped,
        timeStampDiv: items?.[1] || null,
      };
    }
  }
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
