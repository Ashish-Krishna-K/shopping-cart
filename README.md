# Shopping Cart

[Live Demo]()

A basic e-commerce website with a shopping cart feature built as part of [The Odin Project's]() React course. The goal of the project is to practice using
the _react-testing-library_ for unit testing react components and to use _react-router-dom_ for client side routing.

_This project was originally built during my first run of The Odin Project as seen in the [old branch](). During my second run I'm reworkin previous projects and this time I'm using TypeScript as a practice._

## The UI

It's a basic E-commerce website, when the user first opens the website user is greeted with a welcome screen as well as a disclaimer that it's a fake store. User is also shown an image slider/carousel of a few selection of products in the shop page. User can then click on either the **store** link in the top banner, the **shop now** link in the home page or the image to be redirected to the store page.

In the store page, the user is presented with all the available items by default and if the user wishes to narrow down the choice of products by category they can click on the **category** link on the left which will filter the products. The user can add any item to their cart, while adjusting the quantity of items to be added to cart, or if the user wishes to they can click on buy now to be redirected to the checkout page with one quantity of that item in the cart.

In the checkout page, the user can confirm the items they wish to purchase and remove any item they do not wish to buy, check the individual item total and the whole cart total and finally the buy button, which when pressed reminds the user that this is a fake store and provides a link to go back.

The cart is toggleble section which shows the user the current items in the cart, a cart total and **proceed to checkout** button.

## The File Structure

### [src folder](./src/)

The **src** folder contains a **routes** folder and a **components** folder. The **routes** folders contains those components which pertains to the entier page/route while the **components** folder contains the individual components. In addition it also holds a few files as explained below

1. [**main.tsx**](./src/main.tsx): It is the root file of the project.

2. [**testSetup.ts**](./src/testSetup.ts): Handles the clean up after every test.

3. [**appTypes.ts**](./src/appTypes.ts): Exports types that are used in more than one modules.

4. [**testHelpers.tsx**](./src/testHelpers.tsx): Exports any helper item that is needed for the tests.

### [routes folder](./src/routes/)

#### [Router.tsx](./src/routes/Router.tsx)

Exports a route component which handles the routing after wrapping it in a cart context.

#### [mainLayoutPage folder](./src/routes/mainLayoutPage/)

This folder contains the files relating to the **App** component.

1. [**App.tsx**](./src/routes/mainLayoutPage/App.tsx): The App component itself.
2. [**App.test.tsx**](./src/routes/mainLayoutPage/App.test.tsx): The unit tests for the App component.
3. [**App.module.css**](./src/routes/mainLayoutPage/App.module.css): The locally scoped styling for the App component.

#### [errorPage folder](./src/routes/errorPage/)

This folder contains the files related to the error page.

1. [**ErrorPage.tsx**](./src/routes/errorPage/ErrorPage.tsx): The ErrorPage component.
2. [**ErrorPage.module.css**](./src/routes/errorPage/ErrorPage.module.css): The locally scoped styling for the ErrorPage component.

#### [homePage folder](./src/routes/homePage/)

This folder holds the files related to the home page.

1. [**HomePage.tsx**](./src/routes/homePage/HomePage.tsx): The HomePage component itself.
2. [**HomePageLoader.tsx**](./src/routes/homePage/HomePageLoader.tsx): The loader function for the HomePage route.
3. [**HomePage.test.tsx**](./src/routes/homePage/HomePage.test.tsx): The unit tests for the HomePage component.
4. [**HomePage.module.css**](./src/routes/homePage/HomePage.module.css): The locally scoped styling for the HomePage component.

#### [storePage folder](./src/routes/storePage/)

This folder holds the files related to the store page.

1. [**StorePage.tsx**](./src/routes/storePage/StorePage.tsx): The StorePage component itself.
2. [**StorePageLoader.tsx**](./src/routes/storePage/StorePageLoader.tsx): The loader function for the StorePage route.
3. [**StorePage.test.tsx**](./src/routes/storePage/StorePage.test.tsx): The unit tests for the StorePage component.
4. [**StorePage.module.css**](./src/routes/storePage/StorePage.module.css): The locally scoped styling for the StorePage component.

#### [checkoutPage folder](./src/routes/checkoutPage/)

This folder contains the files relating to the checkout page.

1. [**CheckoutPage.tsx**](./src/routes/checkoutPage/CheckoutPage.tsx): The CheckoutPage component itself.
2. [**CheckoutPage.test.tsx**](./src/routes/checkoutPage/CheckoutPage.test.tsx): The unit tests for the CheckoutPage component.
3. [**CheckoutPage.module.css**](./src/routes/checkoutPage/CheckoutPage.module.css): The locally scoped styling for the CheckoutPage component.

### [components folder](./src/components/)

All the individual components are stored in this folder.

#### [carousel folder](./src/components/carousel/)

This folder contains the files relating to the **Carousel** component.

1. [**Carousel.tsx**](./src/components/carousel/Carousel.tsx): The Carousel component itself.
2. [**Carousel.test.tsx**](./src/components/carousel/Carousel.test.tsx): The unit tests for the Carousel component.
3. [**Carousel.module.css**](./src/components/carousel/Carousel.module.css): The locally scoped styling for the Carousel component.

#### [cart folder](./src/components/cart/)

This folder contains the files relating to the **Cart** component.

1. [**Cart.tsx**](./src/components/cart/Cart.tsx): The Cart component itself.
2. [**Cart.test.tsx**](./src/components/cart/Cart.test.tsx): The unit tests for the Cart component.
3. [**Cart.module.css**](./src/components/cart/Cart.module.css): The locally scoped styling for the Cart component.

#### [filterSidebar folder](./src/components/filterSidebar/)

This folder contains the files relating to the **FilterSidebar** component.

1. [**FilterSidebar.tsx**](./src/components/filterSidebar/FilterSidebar.tsx): The FilterSidebar component itself.
2. [**FilterSidebar.test.tsx**](./src/components/filterSidebar/FilterSidebar.test.tsx): The unit tests for the FilterSidebar component.
3. [**FilterSidebar.module.css**](./src/components/filterSidebar/FilterSidebar.module.css): The locally scoped styling for the FilterSidebar component.

#### [navBar folder](./src/components/navBar/)

This folder contains the files relating to the **NavBar** component.

1. [**NavBar.tsx**](./src/components/navBar/NavBar.tsx): The NavBar component itself.
2. [**NavBar.test.tsx**](./src/components/navBar/NavBar.test.tsx): The unit tests for the NavBar component.
3. [**NavBar.module.css**](./src/components/navBar/NavBar.module.css): The locally scoped styling for the NavBar component.

#### [products folder](./src/components/products/)

This folder contains the files relating to the **ProductsDisplay** component.

1. [**ProductsDisplay.tsx**](./src/components/products/ProductsDisplay.tsx): The ProductsDisplay component itself.
2. [**ProductsDisplayLoader.tsx**](./src/components/products/ProductsDisplayLoader.tsx): The loader function for the ProductsDisplayComponent.
3. [**ProductsDisplay.module.css**](./src/components/products/ProductsDisplay.module.css): The locally scoped styling for the ProductsDisplay component.

#### [productItem folder](./src/components/productItem/)

This folder contains the files relating to the **ProductItem** component.

1. [**ProductItem.tsx**](./src/components/productItem/ProductItem.tsx): The ProductItem component itself.
2. [**ProductItem.test.tsx**](./src/components/productItem/ProductItem.test.tsx): The unit tests for the ProductItem component.
3. [**ProductItem.module.css**](./src/components/productItem/ProductItem.module.css): The locally scoped styling for the ProductItem component.

#### [loadingSpinner folder](./src/components/loadingSpinner/)

This folder contains the files relating to the **LoadingSpinner** component.

1. [**LoadingSpinner.tsx**](./src/components/loadingSpinner/LoadingSpinner.tsx): The LoadingSpinner component itself.
2. [**LoadingSpinner.module.css**](./src/components/loadingSpinner/LoadingSpinner.module.css): The locally scoped styling for the LoadingSpinner component.
