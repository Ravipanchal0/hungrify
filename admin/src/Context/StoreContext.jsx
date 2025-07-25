import { createContext, useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const menuCategories = [
    {
      menu_name: "North Indian",
      menu_image: "https://example.com/images/north-indian.jpg",
    },
    {
      menu_name: "South Indian",
      menu_image: "https://example.com/images/south-indian.jpg",
    },
    {
      menu_name: "Gujarati",
      menu_image: "https://example.com/images/gujarati.jpg",
    },
    {
      menu_name: "Rajasthani",
      menu_image: "https://example.com/images/rajasthani.jpg",
    },
    {
      menu_name: "Punjabi",
      menu_image: "https://example.com/images/punjabi.jpg",
    },
    {
      menu_name: "Maharashtrian",
      menu_image: "https://example.com/images/maharashtrian.jpg",
    },
    {
      menu_name: "Bengali Veg",
      menu_image: "https://example.com/images/bengali.jpg",
    },
    {
      menu_name: "Pizza (Veg)",
      menu_image: "https://example.com/images/veg-pizza.jpg",
    },
    {
      menu_name: "Burgers (Veg)",
      menu_image: "https://example.com/images/veg-burger.jpg",
    },
    {
      menu_name: "Sandwiches & Wraps",
      menu_image: "https://example.com/images/sandwich.jpg",
    },
    {
      menu_name: "Chaat & Snacks",
      menu_image: "https://example.com/images/chaat.jpg",
    },
    {
      menu_name: "Momos (Veg)",
      menu_image: "https://example.com/images/veg-momos.jpg",
    },
    {
      menu_name: "Pav Bhaji & Vada Pav",
      menu_image: "https://example.com/images/pav-bhaji.jpg",
    },
    {
      menu_name: "Veg Biryani",
      menu_image: "https://example.com/images/veg-biryani.jpg",
    },
    {
      menu_name: "Fried Rice & Noodles",
      menu_image: "https://example.com/images/fried-rice.jpg",
    },
    {
      menu_name: "Khichdi & Pulao",
      menu_image: "https://example.com/images/khichdi.jpg",
    },
    {
      menu_name: "Paneer Specials",
      menu_image: "https://example.com/images/paneer.jpg",
    },
    {
      menu_name: "Dal & Lentils",
      menu_image: "https://example.com/images/dal.jpg",
    },
    {
      menu_name: "Mixed Veg Curries",
      menu_image: "https://example.com/images/mixed-veg.jpg",
    },
    {
      menu_name: "Kofta & Korma Dishes",
      menu_image: "https://example.com/images/kofta.jpg",
    },
    {
      menu_name: "Dosa & Idli",
      menu_image: "https://example.com/images/dosa.jpg",
    },
    {
      menu_name: "Poha & Upma",
      menu_image: "https://example.com/images/poha.jpg",
    },
    {
      menu_name: "Paratha & Thepla",
      menu_image: "https://example.com/images/paratha.jpg",
    },
    {
      menu_name: "Thali Meals",
      menu_image: "https://example.com/images/thali.jpg",
    },
    {
      menu_name: "Pasta (Veg)",
      menu_image: "https://example.com/images/pasta.jpg",
    },
    {
      menu_name: "Mexican Veg",
      menu_image: "https://example.com/images/mexican.jpg",
    },
    {
      menu_name: "Indo-Chinese Veg",
      menu_image: "https://example.com/images/indo-chinese.jpg",
    },
    {
      menu_name: "Sizzlers (Veg)",
      menu_image: "https://example.com/images/sizzler.jpg",
    },
    {
      menu_name: "Indian Sweets",
      menu_image: "https://example.com/images/sweets.jpg",
    },
    {
      menu_name: "Cakes & Brownies",
      menu_image: "https://example.com/images/cakes.jpg",
    },
    {
      menu_name: "Ice Cream & Kulfi",
      menu_image: "https://example.com/images/ice-cream.jpg",
    },
    {
      menu_name: "Milkshakes & Smoothies",
      menu_image: "https://example.com/images/milkshake.jpg",
    },
    {
      menu_name: "Fresh Juices",
      menu_image: "https://example.com/images/juice.jpg",
    },
    {
      menu_name: "Lassi & Buttermilk",
      menu_image: "https://example.com/images/lassi.jpg",
    },
    {
      menu_name: "Tea & Coffee",
      menu_image: "https://example.com/images/tea.jpg",
    },
    {
      menu_name: "Vegan Specials",
      menu_image: "https://example.com/images/vegan.jpg",
    },
    {
      menu_name: "Jain Food",
      menu_image: "https://example.com/images/jain-food.jpg",
    },
    {
      menu_name: "Satvik Meals",
      menu_image: "https://example.com/images/satvik.jpg",
    },
    {
      menu_name: "Gluten-Free Options",
      menu_image: "https://example.com/images/gluten-free.jpg",
    },
  ];

  const contextValue = { menuCategories };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
