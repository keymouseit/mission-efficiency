interface RawMenuItem {
  id: string;
  attributes: {
    title: string;
    url: string;
    parent: string;
    enabled: boolean;
    weight: number;
  };
}

interface ProcessedMenuItem {
  id: string;
  title: string;
  url: string;
  children?: ProcessedMenuItem[];
}

export function processMenuData(rawData: RawMenuItem[]): ProcessedMenuItem[] {
  const enabledItems = rawData.filter((item) => item.attributes.enabled);

  const itemMap = new Map<string, ProcessedMenuItem>();

  // First pass: create all menu items
  enabledItems.forEach((item) => {
    itemMap.set(item.id, {
      id: item.id,
      title: item.attributes.title,
      url: item.attributes.url,
      children: [],
    });
  });

  // Second pass: build parent-child relationships
  const parentItems: ProcessedMenuItem[] = [];

  enabledItems.forEach((item) => {
    const menuItem = itemMap.get(item.id);
    if (!menuItem) return;

    const parentId = item.attributes.parent;

    if (!parentId || parentId === "") {
      // This is a parent item
      parentItems.push(menuItem);
    } else {
      // This is a child item
      const parentItem = itemMap.get(parentId);
      if (parentItem) {
        if (!parentItem.children) {
          parentItem.children = [];
        }
        parentItem.children.push(menuItem);
      }
    }
  });

  // Sort parents by weight
  parentItems.sort((a, b) => {
    const aWeight =
      enabledItems.find((item) => item.id === a.id)?.attributes.weight || 0;
    const bWeight =
      enabledItems.find((item) => item.id === b.id)?.attributes.weight || 0;
    return aWeight - bWeight;
  });

  // Sort children by weight
  parentItems.forEach((parent) => {
    if (parent.children && parent.children.length > 0) {
      parent.children.sort((a, b) => {
        const aWeight =
          enabledItems.find((item) => item.id === a.id)?.attributes.weight || 0;
        const bWeight =
          enabledItems.find((item) => item.id === b.id)?.attributes.weight || 0;
        return aWeight - bWeight;
      });
    }
  });

  return parentItems;
}
