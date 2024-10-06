import { useLayoutEffect, useRef } from 'react';
import { Divider, List } from '@mui/material';
import { checkScrollbar, scrollToSelected } from '../../../helpers';
import { useAuth } from '../../../hooks';
import { ListItem } from '..';

const DataList = ({
  dense = false,
  disableGutters = false,
  dividerVariant = 'middle',
  data,
  selectedItem,
  handleClickListItem,
  className,
  scrollDependencies = [],
  WebkitLineClamp = 0,
  sxScrollPaddingRight,
  hasScrollbar,
  setHasScrollbar,
}: any) => {
  const { auth: { _id = '' } = {} } = useAuth();
  const listRef = useRef<any>(null);
  const listItemsRef = useRef<any>([]);

  useLayoutEffect(() => {
    if (data?.length) {
      checkScrollbar(listRef, setHasScrollbar);
      scrollToSelected(data, listRef, listItemsRef, selectedItem);
      window.addEventListener('resize', () =>
        checkScrollbar(listRef, setHasScrollbar),
      );
    }

    const listRefObserver = new MutationObserver(() =>
      checkScrollbar(listRef, setHasScrollbar),
    );

    const listElement = listRef?.current;
    if (listElement) {
      listRefObserver?.observe(listElement, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    return () => {
      window.removeEventListener('resize', () =>
        checkScrollbar(listRef, setHasScrollbar),
      );
      listRefObserver?.disconnect();
    };
  }, [data, selectedItem, ...scrollDependencies]);

  const renderList = (
    obj: any,
    idx: number,
    selected: boolean,
    handleClick: any,
    itemsRef?: any,
  ) => {
    const member = obj?.members?.find(
      (chatMember: any) => chatMember?._id !== _id,
    );

    if (member) {
      return (
        <div key={`${JSON.stringify(obj)} ${idx}`}>
          <ListItem
            disableGutters={disableGutters}
            ref={itemsRef ? (el) => (itemsRef.current[idx] = el) : null}
            btnProps={{
              alignItems: 'flex-start',
              textProps: {
                primary: member?.memberDetails?.name,
                secondary: member?.memberDetails?.email,
                primaryTypographyProps: {
                  fontSize: '1.08rem',
                  style: {
                    WebkitLineClamp: 1,
                  },
                },
                secondaryTypographyProps: {
                  fontSize: '0.85rem',
                  style: {
                    WebkitLineClamp,
                  },
                },
              },
              avatarProps: {
                src: member?.memberDetails?.picture,
              },
              onClick: (_) => handleClick(_, obj, member),
              selected,
            }}
          />
          <Divider variant={dividerVariant} />
        </div>
      );
    }

    return null;
  };

  return (
    <List
      dense={dense}
      disablePadding
      className={className}
      ref={listRef}
      sx={(theme) =>
        hasScrollbar
          ? {
              pr: disableGutters ? '1.5rem' : '0.3rem',
              [theme.breakpoints.down('sm')]: {
                pr: sxScrollPaddingRight || '0.8rem',
              },
            }
          : {}
      }
    >
      {data
        ?.slice(0, undefined)
        ?.map((obj: any, idx: number) =>
          renderList(
            obj,
            idx,
            obj?._id === selectedItem?._id,
            handleClickListItem,
            listItemsRef,
          ),
        )}
    </List>
  );
};

export default DataList;
