import { PostComponent } from "./post.component";
import { UserMock } from "../providers/user/user.mock";
import { WordPressMock } from "../providers/wordpress/wordpress.mock";


describe('PostComponent', () => {

   let component: PostComponent;

   it('loadPost', () => {
  
      let postMock = { 765: { id:765, title: "Whatever" } };
        
      let userMock = new UserMock();
      let wordpressMock = new WordPressMock(postMock);
  
      component = new PostComponent(wordpressMock, userMock, null, null, null, null);
  
      component.loadPost(765);
  
      expect(component.post).toEqual( { id: 765, title: "Whatever" } );
   });

   it('loadRelatedPost', () => {
  
      let wordpressMock = new WordPressMock();
      wordpressMock.relatedPostsMock = [ { id: 1 }, { id: 89 }, { id: 77 }, { id: 12 } ];
  
      component = new PostComponent(wordpressMock, null, null, null, null, null);
  
      component.loadRelatedPost(1);
  
      expect(component.relatedPosts).toEqual( [ { id: 1 }, { id: 89 }, { id: 77 }, { id: 12 } ] );
   });

   it('increaseFontSize', () => {
    
      component = new PostComponent(null, null, null, null, null, null);
      component.fontSize = 10;
  
      component.increaseFontSize();
      expect(component.fontSize).toEqual(12);

      component.increaseFontSize();
      expect(component.fontSize).toEqual(14);
   });

   it('decreaseFontSize', () => {
    
      component = new PostComponent(null, null, null, null, null, null);
      component.fontSize = 10;
  
      component.decreaseFontSize();
      expect(component.fontSize).toEqual(8);

      component.decreaseFontSize();
      expect(component.fontSize).toEqual(6);
   });

   it('setFavoriteIcon', () => {
    
      component = new PostComponent(null, null, null, null, null, null);
  
      component.setFavoriteIcon(true);
      expect(component.favoriteIcon).toEqual("favorite");

      component.setFavoriteIcon(false);
      expect(component.favoriteIcon).toEqual("favorite_border");
   });

   it('reloadFavoriteIcon', () => {
    
      let userMock = new UserMock();
      userMock._isLoggedIn = true;
      userMock.favorites.push(22);

      component = new PostComponent(null, userMock, null, null, null, null);
  
      component.reloadFavoriteIcon(22);
      expect(component.favoriteIcon).toEqual("favorite");

      component.reloadFavoriteIcon(33);
      expect(component.favoriteIcon).toEqual("favorite_border");
   });

   it('removeFromFavorites OK', () => {
    
      let postMock = { id:765, title: "Whatever" };
      let userMock = new UserMock();

      component = new PostComponent(null, userMock, null, null, null, null);
      component.favoriteIcon = "favorite";
  
      component.removeFromFavorites(postMock);
      expect(component.favoriteIcon).toEqual("favorite_border");
   });

   it('removeFromFavorites ERROR', () => {
    
      let postMock = { id:765, title: "Whatever" };
      let userMock = new UserMock();
      userMock.persistenceError = "Error";

      component = new PostComponent(null, userMock, null, null, null, null);
      component.favoriteIcon = "favorite";
  
      component.removeFromFavorites(postMock);
      expect(component.favoriteIcon).toEqual("favorite");
   });

   it('setAsFavorite OK', () => {
    
      let postMock = { id:765, title: "Whatever" };
      let userMock = new UserMock();

      component = new PostComponent(null, userMock, null, null, null, null);
      component.favoriteIcon = "favorite_border";
  
      component.setAsFavorite(postMock);
      expect(component.favoriteIcon).toEqual("favorite");
   });

   it('setAsFavorite ERROR', () => {
    
      let postMock = { id:765, title: "Whatever" };
      let userMock = new UserMock();
      userMock.persistenceError = "Error";

      component = new PostComponent(null, userMock, null, null, null, null);
      component.favoriteIcon = "favorite_border";
  
      component.setAsFavorite(postMock);
      expect(component.favoriteIcon).toEqual("favorite_border");
   });
});
 