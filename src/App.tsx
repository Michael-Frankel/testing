import { SimplePost } from "./components/1Simple/SimplePost";
import UseArrayExample from "./components/2Hooks/UseArrayExample";
import { PostWithComment } from "./components/3UserInteraction/PostWithComments";
// import { ShoppingList1 } from "./components/4Errors/ShoppingList1";
// import { ShoppingList1 } from "./components/4Errors/ShoppingList1";
import { ShoppingList2 } from "./components/4Errors/ShoppingList2";
import { ShoppingList } from "./components/5Doubles/1Spies/ShoppingList";
import { Post } from "./components/5Doubles/2SimpleMocks/Post";
import { Post as PostUp } from "./components/5Doubles/4Axios/Post";
import { AppWithRoutes } from "./components/6Router/AppWithRoutes";

function App() {
  const ingredients = ['Apples', 'Bananas', 'Ham', 'Bread']

  const someFunction = (selectedItem: string) => {
    console.log(`Selected ${selectedItem}`);
  }

  return (
    <>
      <AppWithRoutes
      />
      <PostUp
        content="The sun is bright"
        id="123"
        user="Alex"
      />
      <Post
        content="The sun is bright"
        id="123"
        user="Alex"
      />
      <h2>Shopping list 1:</h2>
      {/* <ShoppingList1
        groceries={ingredients}
        selectItem={someFunction}
      /> */}
      <h2>Shopping list 2:</h2>
      <ShoppingList2
        groceries={ingredients}
        selectItem={someFunction}
      />
      <h2>Shopping list 0:</h2>
      <ShoppingList
        groceries={ingredients}
        selectItem={someFunction}
      />

      <PostWithComment
        content="The sky is blue"
        user="Alex"
      />
      <UseArrayExample />
      <SimplePost
        content="The sky is blue"
        user="Alex"
        likesBy={['John', 'Mary']}
      />
    </>
  )
}

export default App