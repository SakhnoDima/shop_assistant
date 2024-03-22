export const combineDoc = (docs) => {
  return docs.map(({ pageContent }) => pageContent).join("\n\n");
};
