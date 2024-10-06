export const resetWindowColor = async (_windowId?: number) => {
  const windowId = _windowId || (await browser.windows.getCurrent()).id;
  if (!windowId) {
    console.error("resetWindowColor: Failed to reset theme for window");
    return;
  }
  console.debug(`resetWindowColor: resetting theme for window: ${windowId})}`);
  browser.theme.reset(windowId);
};
