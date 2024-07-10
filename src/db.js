// db.js
import Dexie from 'dexie';

export const db = new Dexie('less-code-db');
db.version(1).stores({
  pages: '++id, page_id, step, components', // Primary key and indexed props
});

export const findLasted = async(page_id) => {
  return db.pages
    .where({
      page_id,
    })
    .last();
};

export const addPageOperation = async(page_id, step, components) => {
  return await db.pages.add({
    page_id,
    step,
    components,
  });
};

// export const updatePage = pageId => {
//   return await db.pages.where('page_id').equals(pageId).modify({});
// };

export const deletePageOperation = async(pageId) => {
  return await db.pages.where('page_id').equals(pageId).delete();
};