export interface IWordPress {

   getCoverHighlight();
  
   getCoverRowOne();
  
   getCoverRowTwo();
  
   getPost(id);
  
   getCategories();
  
   getCategoriesWithPosts(per_page);
  
   getCategoryPosts(id, offset, per_page);
  
   getRelatedPosts(catId);
  
   getPostsForIds(ids);
  
   sharedpost(id);
  
}
