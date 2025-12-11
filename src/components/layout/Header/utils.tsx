/**
 * Utility functions for menu active state detection based on clicked items
 */

import { DrupalNode } from "next-drupal";
import { menuData } from "./data";
import { config } from "@/lib/config";

interface MenuItemType {
  title: string;
  href?: string;
  icon?: string;
  hasSubmenu?: boolean;
  items?: Record<string, MenuItemType>;
}

/**
 * Route to title mapping for active state detection
 * Maps route paths to their corresponding page titles
 */
export const routeToTitleMap: Record<string, string> = {
  "/": "About Us",
  "/mission": "Mission",
  "/elevate": "Elevate",
  "/call-to-action": "Call To Action",
  "/support": "Support",
  "/invest": "Invest",
  "/country-engagement": "Country engagement",
  "/country-engagement/india": "India",
  "/toolkit": "Toolkit",
  "/trainings": "Trainings",
  "/cfd-tool": "CFD Tools",
  "/get-involved": "Get Involved",
  "/news": "News",
  "/pledge-form": "Mission Efficiency Pledge",
  "/mission-efficiency-pledge": "Mission Efficiency Pledge",
  "/our-work": "Our Work",
  "/raising-ambition": "Raising Ambition",
  // Hash-based routes
  "/mission#approach": "Our approach",
  "/mission#history": "History",
  "/call-to-action#mission-efficiency-pledge": "Mission Efficiency Pledge",
  "/call-to-action#UN-energy-compact": "UN Energy Compact",
  "/call-to-action#cta-ndc": "NDCs",
};

/**
 * Get the page title for a given route path
 * @param pathname - The current pathname
 * @param hash - The current hash (optional)
 * @returns The corresponding page title or null if not found
 */
export function getPageTitleFromRoute(
  pathname: string,
  hash: string = ""
): string | null {
  const fullPath = hash ? `${pathname}${hash}` : pathname;

  // Check exact match first
  if (routeToTitleMap[fullPath]) {
    return routeToTitleMap[fullPath];
  }

  // Check pathname only
  if (routeToTitleMap[pathname]) {
    return routeToTitleMap[pathname];
  }

  // Handle dynamic routes
  if (pathname.startsWith("/country-engagement/")) {
    return "Country engagement"; // Parent menu item
  }

  if (pathname.startsWith("/toolkit/")) {
    return "Toolkit";
  }

  if (pathname.startsWith("/news/")) {
    return "News";
  }

  if (pathname.startsWith("/trainings/")) {
    return "Trainings";
  }

  return null;
}

/**
 * Get the currently selected menu item from localStorage
 * @returns The selected menu item title or null
 */
export function getSelectedMenuItemFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("selectedMenuItem");
  } catch (error) {
    console.warn("Failed to get selected menu item from localStorage:", error);
    return null;
  }
}

/**
 * Store the selected menu item in localStorage
 * @param title - The menu item title to store
 */
export function setSelectedMenuItemInStorage(title: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("selectedMenuItem", title);
  } catch (error) {
    console.warn("Failed to set selected menu item in localStorage:", error);
  }
}

/**
 * Store the selected main menu section in localStorage
 * This is used to distinguish between main menu items that have the same href
 * @param title - The main menu section title (e.g., 'About Us', 'Resources')
 */
export function setSelectedMainMenuInStorage(title: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("selectedMainMenu", title);
  } catch (error) {
    console.warn("Failed to set selected main menu in localStorage:", error);
  }
}

/**
 * Get the selected main menu section from localStorage
 * @returns The selected main menu section title or null
 */
export function getSelectedMainMenuFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("selectedMainMenu");
  } catch (error) {
    console.warn("Failed to get selected main menu from localStorage:", error);
    return null;
  }
}

/**
 * Clear the selected menu item from localStorage
 */
export function clearSelectedMenuItemFromStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("selectedMenuItem");
    localStorage.removeItem("selectedMainMenu");
  } catch (error) {
    console.warn(
      "Failed to clear selected menu items from localStorage:",
      error
    );
  }
}

/**
 * Initialize or update the selected menu item based on current route
 * This should be called when the route changes to handle cases where
 * the user navigates directly to a page or refreshes
 * @param pathname - Current pathname
 * @param hash - Current hash
 */
export function initializeSelectedMenuItemFromRoute(
  pathname: string,
  hash: string = ""
): void {
  if (typeof window === "undefined") return;

  try {
    const currentRoute = hash ? `${pathname}${hash}` : pathname;
    const lastRoute = localStorage.getItem("lastRoute");

    // If the route changed, maintain the selection but update last route
    // This allows the selection to persist across navigation
    if (lastRoute !== currentRoute) {
      localStorage.setItem("lastRoute", currentRoute);
    }

    // Only clear selection if user navigates away and comes back
    // For now, we'll maintain selections to show the last clicked item
  } catch (error) {
    console.warn("Failed to initialize selected menu item from route:", error);
  }
}

/**
 * Find the first menu item that matches the given title
 * @param title - The title to search for
 * @param items - Menu items to search (defaults to main menuData)
 * @returns The first matching menu item or null
 */
function findFirstMenuItemByTitle(
  title: string,
  items: Record<string, MenuItemType> = menuData
): MenuItemType | null {
  for (const [key, item] of Object.entries(items)) {
    if (item.title === title) {
      return item;
    }

    if (item.items) {
      const found = findFirstMenuItemByTitle(title, item.items);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

/**
 * Check if a menu item should be active based on clicked selection ONLY
 * @param item - The menu item to check
 * @param currentTitle - The current page title (kept for compatibility but not used)
 * @param isMainMenu - Whether this is a main menu item (optional)
 * @returns boolean indicating if the item should be active
 */
export function isMenuItemActiveByTitle(
  item: MenuItemType,
  currentTitle: string | null = null,
  isMainMenu: boolean = false
): boolean {
  // Get the selected menu item from localStorage
  const selectedMenuItem = getSelectedMenuItemFromStorage();
  const selectedMainMenu = getSelectedMainMenuFromStorage();

  // For main menu items, check main menu selection
  if (isMainMenu && selectedMainMenu) {
    return item.title === selectedMainMenu;
  }

  // For all items, check if this exact item was clicked
  if (selectedMenuItem) {
    if (item.title === selectedMenuItem) {
      return true;
    }

    // Check if any child items match the selected item
    if (item.items) {
      return Object.values(item.items).some(
        (child) => child.title === selectedMenuItem
      );
    }

    return false;
  }

  // NO FALLBACK - only show active if explicitly clicked
  return false;
}

/**
 * Check if a menu item or any of its children should be active based on clicked selection ONLY
 * @param item - The menu item to check
 * @param currentTitle - The current page title (kept for compatibility but not used)
 * @returns boolean indicating if the item or its children should be active
 */
export function isMenuItemOrChildActiveByTitle(
  item: MenuItemType,
  currentTitle: string | null = null
): boolean {
  // Get the selected menu item from localStorage
  const selectedMenuItem = getSelectedMenuItemFromStorage();

  // If we have a selected item in storage, use that for exact matching
  if (selectedMenuItem) {
    // Direct match with selected item
    if (item.title === selectedMenuItem) {
      return true;
    }

    // Check children recursively for selected item
    if (item.items) {
      return Object.values(item.items).some((child) =>
        isMenuItemOrChildActiveByTitle(child, selectedMenuItem)
      );
    }

    return false;
  }

  // NO FALLBACK - only show active if explicitly clicked
  return false;
}

/**
 * Get all parent menu keys that should be open based on current title
 * Used for mobile menu accordion state
 * @param items - Menu items to search
 * @param targetTitle - The title to find
 * @param currentKey - Current key in recursion
 * @param parents - Parent keys collected so far
 * @returns Array of parent keys that should be open
 */
export function getParentKeysByTitle(
  items: Record<string, MenuItemType>,
  targetTitle: string,
  currentKey: string = "",
  parents: string[] = []
): string[] {
  for (const [key, item] of Object.entries(items)) {
    const fullKey = currentKey ? `${currentKey}-${key}` : key;

    // If we found the target title and there are parents, return them
    if (item.title === targetTitle && parents.length > 0) {
      return [...parents];
    }

    // Search in children
    if (item.items) {
      const result = getParentKeysByTitle(item.items, targetTitle, fullKey, [
        ...parents,
        fullKey,
      ]);
      if (result.length > 0) {
        return result;
      }
    }
  }
  return [];
}

/**
 * Find a menu item by its title in the menu data
 * @param title - The title to search for
 * @param items - Menu items to search (defaults to main menuData)
 * @returns The menu item if found, null otherwise
 */
export function findMenuItemByTitle(
  title: string,
  items: Record<string, MenuItemType> = menuData
): MenuItemType | null {
  for (const [key, item] of Object.entries(items)) {
    if (item.title === title) {
      return item;
    }

    if (item.items) {
      const found = findMenuItemByTitle(title, item.items);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

/**
 * Find which main menu section contains a specific menu item
 * @param itemTitle - The title of the menu item to find
 * @returns The main menu title that contains this item, or null if not found
 */
export function findParentMainMenuTitle(itemTitle: string): string | null {
  for (const [key, mainMenuItem] of Object.entries(menuData)) {
    // Check if the item is directly in this main menu
    if (mainMenuItem.title === itemTitle) {
      return mainMenuItem.title;
    }

    // Check if the item is in any child items
    if (mainMenuItem.items) {
      const found = findMenuItemByTitle(itemTitle, mainMenuItem.items);
      if (found) {
        return mainMenuItem.title;
      }
    }
  }

  return null;
}

/**
 * Check if a menu item title is currently selected (highlighted)
 * @param title - The menu item title to check
 * @returns boolean indicating if the item is selected
 */
export function isMenuItemSelected(title: string): boolean {
  const selectedMenuItem = getSelectedMenuItemFromStorage();
  return selectedMenuItem === title;
}

/**
 * Check if a main menu section is currently selected
 * @param title - The main menu title to check
 * @returns boolean indicating if the main menu is selected
 */
export function isMainMenuSelected(title: string): boolean {
  const selectedMainMenu = getSelectedMainMenuFromStorage();
  return selectedMainMenu === title;
}

function toKey(str: string) {
  return str?.toLowerCase().replace(/\s+/g, "-") ?? "";
}

// Build absolute icon URL
function buildIconPath(path: string) {
  return `${config.apiBase}${path}`;
}

// Normalize child items only (these can have icons)
function normalizeItems(items: any[] = []) {
  return items.map((item) => {
    const key = toKey(item.field_title);

    return {
      key,
      title: item.field_title,
      href: item.field_link,
      parent: item.field_parent || null,
      icon: item?.field_icon?.uri?.url
        ? buildIconPath(item.field_icon.uri.url)
        : null, // child icon only
      children: {},
    };
  });
}

// Format in final menu structure
function formatForMenu(item: any) {
  const hasChildren = Object.keys(item.children).length > 0;

  return {
    title: item.title,
    href: item.href,
    icon: item.icon, // only children get icons
    hasSubmenu: hasChildren,
    items: Object.fromEntries(
      Object.entries(item.children).map(([k, v]) => [k, formatForMenu(v)])
    ),
  };
}

// -------------------------------------------------------
// ⭐ FINAL FUNCTION (top route has NO icon)
// -------------------------------------------------------
export function buildMenuData(api: DrupalNode) {
  const routes = api.field_add_route || [];
  if (!routes.length) return {};

  const finalMenu: any = {};

  routes.forEach((route) => {
    const sectionKey = toKey(route.field_title);

    // Normalize children
    const rawItems = normalizeItems(route.field_add_child_route || []);

    // Map for easy lookup
    const itemMap = new Map(rawItems.map((i) => [i.title, i]));

    // Build hierarchy
    rawItems.forEach((item) => {
      if (item.parent) {
        const parent = itemMap.get(item.parent);
        if (parent) {
          parent.children[item.key] = item;
        }
      }
    });

    // Get only top-level items
    const level1Items = rawItems.filter((i) => !i.parent);

    const formattedChildren: any = {};
    level1Items.forEach((item) => {
      formattedChildren[item.key] = formatForMenu(item);
    });

    // Build final menu section WITHOUT ICON
    finalMenu[sectionKey] = {
      title: route.field_title,
      href: route.field_link,
      hasSubmenu: Object.keys(formattedChildren).length > 0,
      items: formattedChildren,
    };
  });

  return finalMenu;
}
