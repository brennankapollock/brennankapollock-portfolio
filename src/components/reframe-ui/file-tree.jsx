"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { cn } from "@/lib/utils";

/**
 * @typedef {Object} FileTreeViewElement
 * @property {string} id
 * @property {string} name
 * @property {boolean} [isSelectable]
 * @property {FileTreeViewElement[]} [children]
 */

const FileTreeContext = createContext(null);

const useFileTree = () => {
  const context = useContext(FileTreeContext);
  if (!context) {
    throw new Error("useFileTree must be used within a FileTreeProvider");
  }
  return context;
};

const FileTree = forwardRef(
  (
    {
      className,
      elements,
      initialSelectedId,
      initialExpandedItems,
      children,
      indicator = true,
      openIcon,
      closeIcon,
      dir,
      ...props
    },
    ref,
  ) => {
    const [selectedId, setSelectedId] = useState(initialSelectedId);
    const [expandedItems, setExpandedItems] = useState(initialExpandedItems);

    const selectItem = useCallback((id) => {
      setSelectedId(id);
    }, []);

    const handleExpand = useCallback((id) => {
      setExpandedItems((prev) => {
        if (prev?.includes(id)) {
          return prev.filter((item) => item !== id);
        }
        return [...(prev ?? []), id];
      });
    }, []);

    const expandSpecificTargetedElements = useCallback(
      (elementsList, selectId) => {
        if (!elementsList || !selectId) return;
        const findParent = (currentElement, currentPath = []) => {
          const isSelectable = currentElement.isSelectable ?? true;
          const newPath = [...currentPath, currentElement.id];
          if (currentElement.id === selectId) {
            if (isSelectable) {
              setExpandedItems((prev) => [...(prev ?? []), ...newPath]);
            } else {
              if (newPath.includes(currentElement.id)) {
                newPath.pop();
                setExpandedItems((prev) => [...(prev ?? []), ...newPath]);
              }
            }
            return;
          }
          if (
            isSelectable &&
            currentElement.children &&
            currentElement.children.length > 0
          ) {
            currentElement.children.forEach((child) => {
              findParent(child, newPath);
            });
          }
        };
        elementsList.forEach((element) => {
          findParent(element);
        });
      },
      [setExpandedItems],
    );

    useEffect(() => {
      if (initialSelectedId) {
        expandSpecificTargetedElements(elements, initialSelectedId);
      }
    }, [initialSelectedId, elements, expandSpecificTargetedElements]);

    const direction = dir === "rtl" ? "rtl" : "ltr";

    return (
      <FileTreeContext.Provider
        value={{
          selectedId,
          expandedItems,
          handleExpand,
          selectItem,
          setExpandedItems,
          indicator,
          openIcon,
          closeIcon,
          direction,
        }}
      >
        <div className={cn("size-full", className)}>
          <div
            ref={ref}
            className="relative h-full overflow-y-auto px-2"
            dir={direction}
          >
            <AccordionPrimitive.Root
              {...props}
              type="multiple"
              defaultValue={expandedItems}
              value={expandedItems}
              className="flex flex-col gap-1"
              onValueChange={(value) => setExpandedItems(value)}
              dir={direction}
            >
              {children}
            </AccordionPrimitive.Root>
          </div>
        </div>
      </FileTreeContext.Provider>
    );
  },
);

FileTree.displayName = "FileTree";

const FileTreeIndicator = forwardRef(({ className, ...props }, ref) => {
  const { direction } = useFileTree();

  return (
    <div
      dir={direction}
      ref={ref}
      className={cn(
        "absolute left-1.5 h-full w-px rounded-md bg-muted py-3 duration-300 ease-in-out hover:bg-slate-300 rtl:right-1.5",
        className,
      )}
      {...props}
    />
  );
});

FileTreeIndicator.displayName = "FileTreeIndicator";

const Folder = forwardRef(
  (
    {
      className,
      element,
      value,
      isSelectable = true,
      isSelect,
      children,
      ...props
    },
    ref,
  ) => {
    const {
      direction,
      handleExpand,
      expandedItems,
      indicator,
      setExpandedItems,
      openIcon,
      closeIcon,
    } = useFileTree();

    return (
      <AccordionPrimitive.Item
        {...props}
        value={value}
        className="relative h-full overflow-hidden"
      >
        <AccordionPrimitive.Trigger
          className={cn(
            `flex items-center gap-1 rounded-md text-sm`,
            className,
            {
              "bg-muted rounded-md": isSelect && isSelectable,
              "cursor-pointer": isSelectable,
              "cursor-not-allowed opacity-50": !isSelectable,
            },
          )}
          disabled={!isSelectable}
          onClick={() => handleExpand(value)}
        >
          {expandedItems?.includes(value)
            ? (openIcon ?? <FolderOpenIcon className="size-4" />)
            : (closeIcon ?? <FolderIcon className="size-4" />)}
          <span>{element}</span>
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content className="relative h-full overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          {element && indicator && <FileTreeIndicator aria-hidden="true" />}
          <AccordionPrimitive.Root
            dir={direction}
            type="multiple"
            className="ml-5 flex flex-col gap-1 py-1 rtl:mr-5 "
            defaultValue={expandedItems}
            value={expandedItems}
            onValueChange={(value) => {
              setExpandedItems?.(value);
            }}
          >
            {children}
          </AccordionPrimitive.Root>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    );
  },
);

Folder.displayName = "Folder";

const File = forwardRef(
  (
    {
      value,
      className,
      isSelectable = true,
      isSelect,
      fileIcon,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { direction, selectedId, selectItem } = useFileTree();
    const isSelected = isSelect ?? selectedId === value;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (!event.defaultPrevented) {
        selectItem(value);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={!isSelectable}
        className={cn(
          "flex w-fit items-center gap-1 rounded-md pr-1 text-sm duration-200 ease-in-out rtl:pl-1 rtl:pr-0",
          {
            "bg-muted": isSelected && isSelectable,
          },
          isSelectable ? "cursor-pointer" : "cursor-not-allowed opacity-50",
          direction === "rtl" ? "rtl" : "ltr",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {fileIcon ?? <FileIcon className="size-4" />}
        {children}
      </button>
    );
  },
);

File.displayName = "File";

const CollapseButton = forwardRef(
  (
    { className, elements = [], expandAll = false, children, ...props },
    ref,
  ) => {
    const { expandedItems, setExpandedItems } = useFileTree();

    const expendAllFileTree = useCallback(
      (list) => {
        const traverse = (element) => {
          const isSelectable = element.isSelectable ?? true;
          if (isSelectable && element.children?.length) {
            setExpandedItems?.((prev) => [...(prev ?? []), element.id]);
            element.children.forEach(traverse);
          }
        };

        list.forEach(traverse);
      },
      [setExpandedItems],
    );

    const closeAll = useCallback(() => {
      setExpandedItems?.([]);
    }, [setExpandedItems]);

    useEffect(() => {
      if (expandAll) {
        expendAllFileTree(elements);
      }
    }, [expandAll, elements, expendAllFileTree]);

    return (
      <button
        type="button"
        className={cn(
          "absolute bottom-1 right-2 h-8 w-fit rounded-md bg-transparent p-1 text-sm",
          className,
        )}
        onClick={
          expandedItems && expandedItems.length > 0
            ? closeAll
            : () => expendAllFileTree(elements)
        }
        ref={ref}
        {...props}
      >
        {children}
        <span className="sr-only">Toggle</span>
      </button>
    );
  },
);

CollapseButton.displayName = "CollapseButton";

export { CollapseButton, File, Folder, FileTree };
